const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");
const {user,user_order,user_order_item,
    item
} =require("../../models");

module.exports = {
    get : async(req,res)=>{
        try{
            const JWT = jwt.verify(req.cookies.accessToken,secret.secret_jwt);
            const userId = await user.findOne({where:{userId:JWT.userId}});
            const userOrderInfo = await user_order.findAll({
                attributes: ["id", "date","state","deliveryTime","paymentMethod"],
                where: { userId: userId.id },
                raw: true
            }).catch(err => { console.log(err) });
            
            if(userOrderInfo.length === 0){
                return res.status(200).send({data:[]})
            }
            
            const orderIds = userOrderInfo.reduce((acc,ele)=>{
                return [...acc,ele.id]
            },[])
            const userOrderItems = await user_order_item.findAll({
                attributes:["id","orderId","itemId","quantity"],
                where:{ orderId: orderIds},
                raw:true
            })

            const itemIds = userOrderItems.reduce((acc,ele)=>{
                return [...acc,ele.itemId]
              },[]);
        
            const itemIdsDeleteOverlap = itemIds.reduce((acc,ele)=>{
                if(acc.indexOf(ele)===-1){
                    return [...acc,ele]
                }
                return [...acc]
            },[])
            const items = await item.findAll({
                attributes:["id","item","unit"],
                where:{id:itemIdsDeleteOverlap},
                raw:true
            })
            const data = userOrderInfo.reduce((acc,ele,index)=>{
                let orderIdItems = userOrderItems.reduce((OIacc,OIele)=>{
                    if(ele.id===OIele.orderId){
                      const item_ = items.filter(itemId => itemId.id===OIele.itemId)[0];
                      return [...OIacc,{
                        item : item_.item,
                        unit : item_.unit,
                        quantity : OIele.quantity
                      }]
                    }
                    return [...OIacc]
                },[])
                return [...acc,{
                    index,
                    date:ele.date,
                    state:ele.state,
                    orderList:orderIdItems,
                    paymentMethod:ele.paymentMethod,
                    deliveryTime:ele.deliveryTime
                }]
            },[])
           
            return res.status(200).json({data})

        }catch(err){
            res.status(404).send(err)
        }
    }
}
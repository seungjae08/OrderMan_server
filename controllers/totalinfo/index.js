const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config')
const {
  user, user_order, user_order_item,user_market,
  // oauth_user, oauth_user_order, oauth_user_order_item,
  unknown, unknown_order, unknown_order_item,
  item,market
} = require("../../models");
module.exports = {
  get: async (req, res) => {

    // if(회원){회원들이 이용하는것  if(어스)else if(일반회원)=>cookie.userType}=>AccessToken
    // else {비회원들을 위한 것}
    try{
      //회원들
      const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      // 신원확인
      const userId = await user.findOne({ where: { userId: JWT.userId } })


      const userMarket = await user_market.findOne({
        attributes:["marketId"],
        where:{userId:userId.id}
      })
      const marketMobiel =await market.findOne({
        attributes:["mobile"],
        where:{id:userMarket.marketId}
      })
      // 한 유저가 주문한 모든 날짜를 반환
      const userOrderInfo = await user_order.findAll({
        attributes: ["id", "date","state"],
        where: { userId: userId.id },
        raw: true
      }).catch(err => { console.log(err) });
      // 날짜에 해당하는 모든 주문 리스트

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
 
      const data = userOrderInfo.reduce((acc,ele)=>{
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

        let obj ={}
        obj[ele.date] = orderIdItems
        return {...acc,orderList:obj}
      },{})
      // let dataObject = {}
      // const result = data.reduce((ele)=>{
      //   if(Object.keys(ele) ===Object.keys(dataObject)){
      //     dataObject[Object.keys(ele)[0]].push(ele.)
      //   }
      // })

      res.json({...data,market:{mobile:marketMobiel.mobile}})
      


        /**
         * {
         *  orderList: {
         *    date1: [{item, quantity, unit}, {item, quantity, unit},{item, quantity, unit},{item, quantity, unit}],
         *    date2: [{}],
         * },
         *  market: string,
         *  temp: [ {}, {} ]
         * }
         */
    }catch(err){
      if(err.message ==="jwt must be provided"){
        //비회원들에게 진행될 코드들
        res.status(202).send({
            orderList:{},
            market:{
		          mobile:""
            }
        })
      }
    }

    // 완전 최초 사용자 일 때
  },
};

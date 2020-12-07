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

        // 한 유저가 주문한 모든 날짜를 반환
        const userOrderInfo = await user_order.findAll({
          attributes: ["id", "date"],
          where: { userId: userId.id },
          raw: true
        })
        .catch(err => { console.log(err) });
	console.log("날짜반환")
        // 날짜에 해당하는 모든 주문 리스트
        const orderList = await userOrderInfo.reduce(async (acc, obj) => {
          const orderLiEl = await acc;
	  console.log("주문 리스트")
          // option === [ {item_id, quantity}, {item_id, quantity} ]
          const option = await user_order_item.findAll({
            attributes: ["itemId", "quantity"],
            where: { orderId: [obj.id] }, // obj.id => [1,2,3,4,5]
            raw: true
          })
          console.log("주문 옵션")
          // order === [{name, quantity, unit},{name, quantity, unit}]
          const order = await option.reduce(async (acc, obj) => {
            const orderEli = await acc;

            // result === {name, unit}
            let result = await item.findAll({
              attributes: ["item", "unit"],
              where: { id: [obj.itemId] },
              raw: true
            });

            result = result[0]

            result = {
              ...result,
              quantity: obj.quantity
            };

            (await orderEli.push(result));

            return orderEli;
          }, []);

          if (!orderLiEl[obj.date]) {
            orderLiEl[obj.date] = order;
          } else {
            orderLiEl[obj.date] = [...orderLiEl[obj.date], ...order]
          }
          return await orderLiEl;
        }, {})
	console.log("why")
	const market_ = await user_market.findOne({
	  attributes:["marketId"],
          where : {userId:userId.id}
        }).catch(err=>{console.log(err)})
	console.log(market_)
        if(market_===null){
          console.log("여긴되냐?")
	  res.send({orderList:orderList,market:{mobile:""}})
	}else{	
          const market_mobile = await market.findOne({
	    attributes:["mobile"],
            where : {id:market_.marketId}
          })
       
          res.send({orderList:orderList,market:{mobile:market_mobile.mobile}})
	}
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

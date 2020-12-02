const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config')
const {
  user, user_order, user_order_item,
  // oauth_user, oauth_user_order, oauth_user_order_item,
  unknown, unknown_order, unknown_order_item,
  item
} = require("../../models");
module.exports = {
  get: async (req, res) => {
    let result = {};
    if (req.cookies.userType === 'standard') {
      // 신원확인
      const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      const userId = await user.findOne({ where: { userId: JWT.userId } })

      // 한 유저가 주문한 모든 날짜를 반환
      const userOrderInfo = await user_order.findAll({
        attributes: ["id", "date"],
        where: { user_id: userId.id },
        raw: true
      })
        .catch(err => { console.log(err) });

      // 날짜에 해당하는 모든 주문 리스트
      const orderList = await userOrderInfo.reduce(async (acc, obj) => {
        console.log('orderList의 obj: ', obj)
        const orderLiEl = await acc;
        // option === [ {item_id, quantity}, {item_id, quantity} ]
        const option = await user_order_item.findAll({
          attributes: ["item_id", "quantity"],
          where: { order_id: [obj.id] }, // obj.id => [1,2,3,4,5]
          raw: true
        })

        // order === [{name, quantity, unit},{name, quantity, unit}]
        const order = await option.reduce(async (acc, obj) => {
          const orderEli = await acc;
          // result === {name, unit}
          let result = await item.findAll({
            attributes: ["name", "unit"],
            where: { id: [obj.item_id] },
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



      await res.send(orderList)

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
    }
    else if (req.cookies.userType === 'oauth') {

    }
    else if (req.cookies.userType === 'unknown') {

    }
    // 완전 최초 사용자 일 때
    else {
      res.status(200).end();
    }
  },
};

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
      const userId = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      const userInfo = await user.findOne({ where: { userId: userId } });
      console.log(userInfo, '유저 인포!!!!!!!!!!!!')

      // 한 유저의 모든 날짜를 반환
      const dateList = await user_order.findAll({ where: { user_id: userInfo.dataValues.id } });
      console.log(dateList, '데이트리스트~~~~~~~~~~~~~~~~~~~~~~~~')
      // 날짜 데이터의 필드 이름은 date라고 가정.
      // 한 특정 날짜가 속한 user_orders 테이블의 id에 해당하는 모든 user_order_item의 row를 반환
      // for (let date of dateList.dataValues.date) {

      // }


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
      res.status(200).send(dateList)
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

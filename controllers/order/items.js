const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config')
const {
  user, user_order, user_order_item,
  oauth_user, oauth_user_order, oauth_user_order_item,
  unknown, unknown_order, unknown_order_item,
  item
} = require("../../models");

module.exports = {
  post: async (req, res) => {
    /* 회원주문과 비회원주문 분기처리 필요! */

    if (req.cookies.accessToken) {
      // 쿠키에 담긴 jwt의 body를 decode해서 사용자 ID 확인
      const { userId } = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      // 받은 데이터 확인
      const { itemList, deliveryTime, paymentMethod } = req.body;

      // 사용자 ID로 user테이블의 id 찾기
      const userSelected = await user.findOne({ where: { userId: `${userId}` } });
      // 위의 id를 기반으로 user_order 테이블에 데이터 기록
      const option = await user_order.create({
        user_id: userSelected.id,
        deliveryTime: deliveryTime,
        paymentMethod: paymentMethod
      })
      // itemList 객체에 반복문으로 item 테이블에 데이터 기록
      // 위의 기록한 item 테이블의 id를 기반으로 user_order_item 테이블에 데이터 기록
      for (let product of itemList) {
        let [newProduct, created] = await item.findOrCreate({
          where: {
            name: product.item,
            unit: product.unit
          },
          defaults: {
            name: product.item,
            unit: product.unit
          }
        })

        await user_order_item.create({
          order_id: option.id,
          item_id: newProduct.id,
          quantity: product.quantity
        })
      }

      // 마지막으로 보내줄 값 지정필요
      res.status(200).send(req.cookies)
      // 비회원 주문 처리
    } else if (req.cookies.unknown_id) {

      const unknownId = req.cookies.unknown_id
      const { itemList, deliveryTime, paymentMethod } = req.body;

      const option = await unknown_order.create({
        user_id: unknownId,
        deliveryTime: deliveryTime,
        paymentMethod: paymentMethod
      })

      for (let product of itemList) {
        let [newProduct, created] = await item.findOrCreate({
          where: {
            name: product.item,
            unit: product.unit
          },
          defaults: {
            name: product.item,
            unit: product.unit
          }
        })
        await unknown_order_item.create({
          order_id: option.id,
          item_id: newProduct.id,
          quantity: product.quantity
        })
      }

      // 마지막으로 보내줄 값 지정필요
      res.status(200).send(req.cookies)
    }
  },
}; 
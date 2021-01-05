const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config')
const {
  user, user_order, user_order_item,
  oauth, oauth_order, oauth_order_item, oauth_market,
  unknown, unknown_order, unknown_order_item,
  item
} = require("../../models");

module.exports = {
  get: async (req, res) => {
    let items = await item.findAll({
      attributes: ["item", "unit"]
    })
    let itemNames = items.reduce((acc, ele) => {
      if (acc.indexOf(ele.item) === -1) {
        return [...acc, ele.item]
      } else {
        return [...acc]
      }

    }, [])
    let unitNames = items.reduce((acc, ele) => {
      if (acc.indexOf(ele.unit) === -1) {
        return [...acc, ele.unit]
      } else {
        return [...acc]
      }
    }, [])
    res.json({ itemNames, unitNames })
  },
  post: async (req, res) => {

    try {
      // 쿠키에 담긴 jwt의 body를 decode해서 사용자 ID 확인
      const { userId } = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      // 1. 회원분기 처리: 일반회원은 standard
      if (req.cookies.userType === "standard") {
        // POST 데이터 확인
        const { itemList, deliveryTime, paymentMethod, date, hopePrice } = req.body;
        // 사용자 ID로 user테이블의 id 찾기
        const userSelected = await user.findOne({
          where: { userId: userId },
          raw: true
        });
        // 위의 id를 기반으로 user_order 테이블에 데이터 기록
        const option = await user_order.create({
          userId: userSelected.id,
          deliveryTime: deliveryTime,
          paymentMethod: paymentMethod,
          date: date,
          hopePrice: hopePrice,
          state: false
        })
        // itemList 객체에 반복문으로 item 테이블에 데이터 기록
        for (let product of itemList) {
          let [newProduct, created] = await item.findOrCreate({
            where: {
              item: product.item,
              unit: product.unit
            },
            defaults: {
              item: product.item,
              unit: product.unit
            }
          })
          // 위의 기록한 item 테이블의 id를 기반으로 user_order_item 테이블에 데이터 기록
          await user_order_item.create({
            orderId: option.dataValues.id,
            itemId: newProduct.dataValues.id,
            quantity: product.quantity
          })
        }
        // 주문완료 후 장바구니 쿠키 제거
        res.clearCookie("tempToken", { secure: true, sameSite: "none" })
        res.status(200).send("your order is successed")
      }
      // 2. 회원분기 처리: Oauth회원은 oauth
      else if (req.cookies.userType === "oauth") {
        // oauth 진행 때 수정 필요
        // POST 데이터 확인
        const { itemList, deliveryTime, paymentMethod, date, hopePrice } = req.body;
        // 사용자 ID로 user테이블의 id 찾기
        const userSelected = await oauth.findOne({
          where: { userId: userId },
          raw: true
        });
        // 위의 id를 기반으로 user_order 테이블에 데이터 기록
        const option = await oauth_order.create({
          userId: userSelected.id,
          deliveryTime: deliveryTime,
          paymentMethod: paymentMethod,
          date: date,
          hopePrice: hopePrice,
          state: false
        })
        // itemList 객체에 반복문으로 item 테이블에 데이터 기록
        for (let product of itemList) {
          let [newProduct, created] = await item.findOrCreate({
            where: {
              item: product.item,
              unit: product.unit
            },
            defaults: {
              item: product.item,
              unit: product.unit
            }
          })
          // 위의 기록한 item 테이블의 id를 기반으로 user_order_item 테이블에 데이터 기록
          await oauth_order_item.create({
            orderId: option.dataValues.id,
            itemId: newProduct.dataValues.id,
            quantity: product.quantity
          })
        }
        // 주문완료 후 장바구니 쿠키 제거
        res.clearCookie("tempToken", { secure: true, sameSite: "none" })
        res.status(200).send("your order is successed")
      }
    }
    // 3. 회원분기 처리: 비회원은 unknown
    catch (err) {
      if (err.message === "jwt must be provided") {
        const unknownId = req.cookies.unknown_id
        const { itemList, deliveryTime, paymentMethod } = req.body;

        const option = await unknown_order.create({
          userId: unknownId,
          deliveryTime: deliveryTime,
          paymentMethod: paymentMethod,
          state: false
        })

        for (let product of itemList) {
          let [newProduct, created] = await item.findOrCreate({
            where: {
              item: product.item,
              unit: product.unit
            },
            defaults: {
              item: product.item,
              unit: product.unit
            }
          })
          await unknown_order_item.create({
            orderId: option.dataValues.id,
            itemId: newProduct.dataValues.id,
            quantity: product.quantity
          })
        }
        // 주문완료 후 장바구니 쿠키 제거
        res.clearCookie("tempToken", { secure: true, sameSite: "none" })
        res.status(200).send("your order is successed")
      }
      else {
        res.status(404).send(err)
      }
    }
  },
}; 

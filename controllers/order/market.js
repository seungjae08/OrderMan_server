const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config')
const {
  user, user_market,
  // oauth, oauth_market,
  unknown, unknown_market,
  market
} = require("../../models");

module.exports = {
  post: async (req, res) => {
    // 회원 비회원 분기 처리
    if (req.cookies.userType === "standard") {
      // 쿠키에 담긴 jwt의 body를 decode해서 사용자 ID 확인
      const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      // 받은 데이터 확인
      const { mobile } = req.body;

      // 사용자 ID로 user테이블의 id 찾기
      const userSelected = await user.findOne({
        where: { userId: JWT.userId },
        raw: true
      });
      let [mart, b] = await market.findOrCreate({
        where: { mobile: mobile },
        defaults: { mobile: mobile },
        raw: true
      })

      // 위의 id를 기반으로 user_order 테이블에 데이터 기록
      let [result, created] = await user_market.findOrCreate({
        where: { user_id: userSelected.id },
        defaults: { user_id: userSelected.id, market_id: mart.id },
        raw: true
      })

      if (!created) {
        result = await user_market.update({ market_id: mart.id }, {
          where: { user_id: userSelected.id }
        });
      }

      res.status(200).send(result);
    }
    // oauth회원 주문 처리
    else if (req.cookies.userType === "oauth") {
      res.status(200).end()
    }
    // 비회원 주문 처리
    else if (req.cookies.userType === "unknown") {
      const unknownId = req.cookies.unknown_id
      const { mobile } = req.body;

      let [mart, b] = await market.findOrCreate({
        where: { mobile: mobile },
        defaults: { mobile: mobile }
      })

      let [a, created] = await unknown_market.findOrCreate({
        where: { user_id: unknownId },
        defaults: { user_id: unknownId, market_id: mart.id }
      })
      if (!created) {
        await unknown_market.update({ market_id: mart.id }, {
          where: { user_id: unknownId }
        });
      }
      // 마지막으로 보내줄 값 지정필요
      res.status(200).send(req.cookies)
    }
  },
};
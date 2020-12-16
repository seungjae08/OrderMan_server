const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config')
const {
  user, user_market,
  oauth, oauth_market,
  unknown, unknown_market,
  market
} = require("../../models");

module.exports = {
  post: async (req, res) => {
    try {
      // 쿠키에 담긴 jwt의 body를 decode해서 사용자 ID 확인
      const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      // 1. 회원분기 처리: 일반회원은 standard
      if (req.cookies.userType === "standard") {
        // POST 데이터 확인
        const { mobile } = req.body;
        // 사용자 ID로 user테이블의 id 찾기
        const userSelected = await user.findOne({
          attributes: ["id"],
          where: { userId: JWT.userId },
          raw: true
        });
        // 선호마트정보 기입
        let [mart, b] = await market.findOrCreate({
          where: { mobile: mobile },
          defaults: { mobile: mobile },
          raw: true
        })
        // 위의 id를 기반으로 user_order 테이블에 데이터 기록
        let [result, created] = await user_market.findOrCreate({
          where: { userId: userSelected.id },
          defaults: { userId: userSelected.id, marketId: mart.id },
          raw: true
        }).catch(err => { res.status(404).send(err) })

        if (!created) {
          result = await user_market.update({ marketId: mart.id }, {
            where: { userId: userSelected.id }
          }).catch(err => { res.send(err) })
        }

        res.status(200).send({ result, created })
      }
      // 2. 회원분기 처리: oauth회원은 oauth
      else if (req.cookies.userType === "oauth") {
        // POST 데이터 확인
        const { mobile } = req.body;
        // 사용자 ID로 user테이블의 id 찾기
        const userSelected = await oauth.findOne({
          attributes: ["id"],
          where: { userId: JWT.userId },
          raw: true
        });
        // 선호마트정보 기입
        let [mart, b] = await market.findOrCreate({
          where: { mobile: mobile },
          defaults: { mobile: mobile },
          raw: true
        })
        // 위의 id를 기반으로 user_order 테이블에 데이터 기록
        let [result, created] = await oauth_market.findOrCreate({
          where: { userId: userSelected.id },
          defaults: { userId: userSelected.id, marketId: mart.id },
          raw: true
        }).catch(err => { res.status(404).send(err) })

        if (!created) {
          result = await oauth_market.update({ marketId: mart.id }, {
            where: { userId: userSelected.id }
          }).catch(err => { res.send(err) })
        }

        res.status(200).send({ result, created })
      }
    }
    // 3. 회원분기 처리: 비회원은 unknown
    catch (err) {
      if (err.message === "jwt must be provided") {
        //비회원들에게 진행될 코드들
        try {
          const unknownId = Number(req.cookies.unknown_id)
          const { mobile } = req.body;

          let [mart, b] = await market.findOrCreate({
            where: { mobile: mobile },
            defaults: { mobile: mobile }
          })

          let [a, created] = await unknown_market.findOrCreate({
            attributes: ["id", "userId", "marketId"],
            where: { userId: unknownId },
            defaults: { userId: unknownId, marketId: mart.id }
          })

          if (!created) {
            await unknown_market.update({ market_id: mart.id }, {
              where: { user_id: unknownId }
            });
          }

          res.status(200).send({ mart, b, unknownId, a })

        } catch (err) {
          res.status(202).send(err)
        }
      }
    }
  },
};

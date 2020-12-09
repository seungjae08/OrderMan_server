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
    try{
      const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      if (req.cookies.userType === "standard") {
        // 쿠키에 담긴 jwt의 body를 decode해서 사용자 ID 확인
        // 받은 데이터 확인
        const { mobile } = req.body;

        // 사용자 ID로 user테이블의 id 찾기
        const userSelected = await user.findOne({
	        attributes:["id"],
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
          where: { userId: userSelected.id },
          defaults : { userId: userSelected.id, marketId: mart.id},
          raw: true
        }).catch(err=>{res.status(404).send(err)})

        if (!created) {
          result = await user_market.update({ marketId: mart.id }, {
            where: { userId: userSelected.id }
          }).catch(err=>{res.send(err)})
        }

        res.status(200).send({result,created})

        // res.status(200).send(result);
      }
      // oauth회원 주문 처리
      else if (req.cookies.userType === "oauth") {
        res.status(200).end()
      }
    }catch(err){
        if(err.message ==="jwt must be provided"){
          //비회원들에게 진행될 코드들
	      try{
          const unknownId =Number( req.cookies.unknown_id)
          const { mobile } = req.body;

          let [mart, b] = await market.findOrCreate({
            where: { mobile: mobile },
            defaults: { mobile: mobile }
          })
	
	
          let [a, created] = await unknown_market.findOrCreate({
	          attributes:["id","userId","marketId"],
            where: { userId: unknownId },
            defaults: { userId: unknownId, marketId: mart.id }
          })
       
 
          if (!created) {
            await unknown_market.update({ market_id: mart.id }, {
            where: { user_id: unknownId }
            });
          }
          // 마지막으로 보내줄 값 지정필요
          res.status(200).send({mart,b,unknownId,a})
         
        }catch(err){
         res.status(202).send(err)
        }
      }
    }
  },
};

module.exports = {
  post: async (req, res) => {
    // 회원 비회원 분기 처리
    if (req.cookies.accessToken) {
      // 쿠키에 담긴 jwt의 body를 decode해서 사용자 ID 확인
      const { userId } = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
      // 받은 데이터 확인
      const { mobile } = req.body;

      // 사용자 ID로 user테이블의 id 찾기
      const userSelected = await user.findOne({ where: { userId: `${userId}` } });
      let [mart, b] = await market.findOrCreate({
        where: { mobile: mobile },
        defaults: { mobile: mobile }
      })

      // 위의 id를 기반으로 user_order 테이블에 데이터 기록
      let [a, created] = await user_market.findOrCreate({
        where: { user_id: userSelected.id },
        defaults: { user_id: userSelected.id, market_id: mart.id }
      })
      if (!created) {
        await user_market.update({ market_id: mart.id }, {
          where: { user_id: userSelected.id }
        });
      }

      // 마지막으로 보내줄 값 지정필요
      res.status(200).send(req.cookies)
      // 비회원 주문 처리
    } else if (req.cookies.unknown_id) {

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
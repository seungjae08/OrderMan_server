const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

module.exports = {
  post: async (req, res) => {

    const { itemList } = req.body

    const tempToken = jwt.sign(
      { temp: itemList },
      secret.secret_jwt,
      { expiresIn: "7d" }
    );

    // 보내줄 쿠키 만들기
    res.cookie('tempToken', tempToken)
    res.status(200).json({ tempToken: tempToken });
  },
  get: async (req, res) => {
    // totalInfo로 옮기기

    // tempToken 유무 분기 필요
    const { temp } = jwt.verify(req.cookies.tempToken, secret.secret_jwt);

    console.log(temp)
    res.status(200).json({ temp: temp })
  }
};
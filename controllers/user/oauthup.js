const fetch = require("node-fetch");
const fileType = require('file-type');
const { oauth_user } = require("../../models");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config");

module.exports = {
  post: async (req, res) => {
    // 최초 Oauth 회원가입 시 여기서 데이터 받아서 저장
    const kakaoId = jwt.verify(req.cookies.accessToken, secret.secret_jwt).userId;
    const { mobile, address, brand, birth } = req.body;
    let [oauthUser, created] = await oauth_user.findOrCreate({
      where: {
        // userId 혹은 mobile 중복 여부 체크
        [Op.or]: [{ userId: kakaoId }, { mobile: mobile }],
      },
      defaults: {
        userId: kakaoId,
        mobile: mobile,
        address: address,
        brand: brand,
        birth: birth
      },
    });
    if (created) {
      res.status(200).send("Oauth sign up successed");
    } else {
      res.status(202).send(oauthUser);
    };
  },
  get: async (req, res) => {
    const token = "Bearer " + req.token;
    fetch('https://kapi.kakao.com/v1/user/access_token_info',
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          'Authorization': token,
        }
      })
      .then(res => {
        return res.json();
      })
      .then(async (data) => {
        const kakaoId = data.id;
        console.log(kakaoId);

        const userInfo = await oauth_user.findOne({
          where: { userId: kakaoId }
        });
        console.log(userInfo);

        if (userInfo) {
          // 기존회원 200
          const accessToken = jwt.sign({ userId: kakaoId },
            secret.secret_jwt,
            { expiresIn: "7d" }
          );
          res.cookie("accessToken", accessToken, { secure: true, sameSite: 'none' });
          res.cookie("userType", "oauth", { secure: true, sameSite: 'none' });
          res.status(200)
            .json({ accessToken: accessToken, message: "Already exist user, welcome to login" });
        } else {
          // 신규회원 202
          res.status(202).send("User doesn't exist. Please sign up firstly");
        }
      })
      .catch(err => {
        res.status(200).send(err);
      });
  }
};

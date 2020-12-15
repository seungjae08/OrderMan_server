const jwt = require("jsonwebtoken");
const { user, oauth_user } = require("../../models");

// password 암호화 진행
const crypto = require("crypto");
const { secret } = require("../../config/config");

module.exports = {
  get: async (req, res) => {
    try {
      if (req.cookie.userType === "standard") {
        const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
        const userId = await user.findOne({ where: { userId: JWT.userId } })
        res.status(200).send("200")
      } else if (req.cookie.userType === "oauth") {
        const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
        const userId = await oauth_user.findOne({ where: { userId: JWT.userId } })
        res.status(200).send("200")
      }
    } catch (err) {
      if (err.message === "jwt must be provided") {
        res.status(202).send("202")
      }
      else if (err.message === "jwt expired") {
        res.clearCookie("accessToken")
        res.status(202).send("202")
      }
    }
  },
  post: async (req, res) => {
    const { userId, password } = req.body;
    // password 암호화 진행
    const encrypted = crypto
      .createHmac("sha256", secret.secret_pw)
      .update(password)
      .digest("base64");
    let idSearch = await user.findOne({
      where: {
        userId: userId,
      },
    });
    // user 테이블에서 id 찾았을 때 없으면 "id does not exist"
    if (idSearch) {
      let pwSearch = await user.findOne({
        where: {
          userId: userId,
          password: encrypted,
        },
      });
      // user 테이블에서 id는 맞는데 password가 틀렸을 때는 "wrong password"
      if (pwSearch) {
        const accessToken = jwt.sign(
          {
            userId: userId,
          },
          secret.secret_jwt,
          { expiresIn: "7d" }
        );
        res.cookie("accessToken", accessToken, { secure: true, sameSite: 'none' });
        res.cookie("userType", "standard", { secure: true, sameSite: 'none' });
        res
          .status(200)
          .json({ accessToken: accessToken, message: "login success" });
        // 로그인 이후 리다이렉션 어떻게 진행할지 논의 필요
      } else {
        res.status(204).send("wrong password");
      }
    } else {
      res.status(204).send("id does not exist");
    }
  },
};

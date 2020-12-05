const { user } = require("../../models");
const { Op } = require("sequelize");

// password 암호화 진행
const crypto = require("crypto");
const { secret } = require("../../config/config");

module.exports = {
  post: async (req, res) => {
    const { userId, password, mobile, address, brand, birth } = req.body;
    
    // password 암호화 진행
    const encrypted = crypto
      .createHmac("sha256", secret.secret_pw)
      .update(password)
      .digest("base64");
    const [userinfo, created] = await user.findOrCreate({
      where: {
        // userId 혹은 mobile 중복 여부 체크
        [Op.or]: [{ userId: userId }, { mobile: mobile }],
      },
      defaults: {
        userId: userId,
        // DB에는 암호화된 password 저장
        password: encrypted,
        mobile: mobile,
        address: address,
        brand: brand,
        birth: birth
      },
    });
    if (created) {
      res.status(200).send("signup success");
    } else {
      res.status(204).send({userId,password,mobile,address,brand,birth});
    }
  },
};

const { user } = require("../../models");

const crypto = require("crypto");
const { secret } = require("../../config/config");

module.exports = {
  post: async (req, res) => {
    const encrypted = crypto
      .createHmac("sha256", secret.secret)
      .update(req.body.password)
      .digest("base64");
    const [userinfo, created] = await user.findOrCreate({
      where: {
        [Op.or]: [{ userId: req.body.userId }, { mobile: req.body.mobile }],
      },
      defaults: {
        userId: req.body.userId,
        password: encrypted,
        mobile: req.body.mobile,
        address: req.body.address,
        brand: req.body.brand,
      },
    });
    if (created) {
      res.status(200).send("signup success");
    } else {
      res.status(204).send("already existing user");
    }
  },
};

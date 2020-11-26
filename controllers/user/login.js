const jwt = require("jsonwebtoken");
const { user } = require("../../models");

module.exports = {
  post: async (req, res) => {
    const { userId, password } = req.body;
    const se;
    const [userinfo, created] = await user.findOrCreate({
      where: {
        [Op.or]: [{ userId: req.body.userId }, { mobile: req.body.mobile }],
      },
      defaults: {
        userId: req.body.userId,
        password: req.body.password,
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

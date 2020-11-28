const jwt = require("jsonwebtoken");
const { secret } = require('../../config/config')

module.exports = {
  post: async (req, res) => {

    const { userId } = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
    console.log(userId, '디코디드')
    res.status(200).send(req.cookies)
  },
};
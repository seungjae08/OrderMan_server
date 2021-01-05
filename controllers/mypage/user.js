const jwt = require("jsonwebtoken");
const { secret } = require("../../config/config")
const { user, oauth } = require("../../models")
module.exports = {
    get: async (req, res) => {
        try {
            const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
            if (req.cookies.userType === "standard") {
                const userData = await user.findOne({
                    attributes: ["mobile", "birth", "address", "brand"],
                    where: { userId: JWT.userId },
                    raw: true
                });
                res.status(200).send({ ...userData, id: JWT.userId });
            } else if (req.cookies.userType === "oauth") {
                const userData = await oauth.findOne({
                    attributes: ["mobile", "birth", "address", "brand"],
                    where: { userId: JWT.userId },
                    raw: true
                });
                res.status(200).send({ ...userData, id: JWT.userId });
            }
        } catch (err) {
            res.send(err);
        }
    },
    post: async (req, res) => {
        try {
            const JWT = jwt.verify(req.cookies.accessToken, secret.secret_jwt);
            const { birth, address, brand } = req.body;
            if (req.cookies.userType === "standard") {
                const userDataUpdate = user.update({ address, brand, birth }, {
                    where: { userId: JWT.userId }
                });
                res.status(200).send({ state: true });
            } else if (req.cookies.userType === "oauth") {
                const userDataUpdate = oauth.update({ address, brand, birth }, {
                    where: { userId: JWT.userId }
                });
                res.status(200).send({ state: true });
            }
        } catch (err) {

        }
    }
}
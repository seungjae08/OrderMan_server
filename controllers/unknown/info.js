const { unknown } = require("../../models");

module.exports = {
    post: async (req, res) => {
        // 비회원주문을 한 적이 있는 경우
        if (req.cookies.unknown_id) {
            res.status(200).end()
        }
        // 비회원주문이 처음인 경우
        else {
            const { mobile, address, brand } = req.body;
            const data = await unknown.create({
                mobile: mobile,
                address: address,
                brand: brand
            })

            res.cookie("unknown_id", data.dataValues.id, /*{ secure: true }*/);
            res.cookie("userType", "unknown");
            res.status(200).json("success");
        }
    },
};

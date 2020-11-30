const { unknown } = require("../../models");

module.exports = {
    post: async (req, res) => {
        if (req.cookies.unknown_id) {
            res.status(200).end()
        } else {
            const { mobile, address, brand } = req.body;
            const data = await unknown.create({
                mobile: mobile,
                address: address,
                brand: brand
            })

            res.cookie("unknown_id", data.id, /*{ secure: true }*/);
            res.status(200).json("success");
        }
    },
};

const { unknown } = require("../../models");

module.exports = {
    post: async (req, res) => {
        // 비회원주문을 한 적이 있는 경우
        const { mobile, address, brand, birth } = req.body;
        const data = await unknown.create({
            mobile: mobile,
            address: address,
            brand: brand,
	    birth : birth
        })

        res.cookie("unknown_id", data.dataValues.id, { secure: true,sameSite:"none" });
        res.cookie("userType", "unknown",{secure:true,sameSite:"none"});
        res.status(200).json("success");
    },
};

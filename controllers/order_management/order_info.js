const {
    user, user_order, user_order_item,
    unknown, unknown_order, unknown_order_item,
    item, market
} = require("../../models");

module.exports = {
    get: async (req, res) => {
        try {
            // 모든 DB 데이터 호출
            let users = await user.findAll({
                attributes: ["id", "mobile", "address", "brand"],
                raw: true
            });
            let userOrderData = await user_order.findAll({
                attributes: ["id", "userId", "deliveryTime", "paymentMethod", "state"],
                raw: true
            });
            let userOrderItems = await user_order_item.findAll({
                attributes: ["orderId", "itemId", "quantity"],
                raw: true
            });

            let unknowns = await unknown.findAll({
                attributes: ["id", "mobile", "address", "brand"],
                raw: true
            });
            let unknownOrderData = await unknown_order.findAll({
                attributes: ["id", "userId", "deliveryTime", "paymentMethod", "state"],
                raw: true
            });
            let unknownOrderItems = await unknown_order_item.findAll({
                attributes: ["orderId", "itemId", "quantity"],
                raw: true
            });

            let items = await item.findAll({
                attributes: ["id", "item", "unit"],
                raw: true
            });


            let userData = await userOrderData.reduce((acc, ele) => {
                let userInfo = users.filter(userEle => ele.userId === userEle.id)[0];
                let orderItems = userOrderItems.filter(orderItemsEle => orderItemsEle.orderId === ele.id);
                let itemList = orderItems.reduce((listacc, listele) => {
                    let itemNameUnit = items.filter(itemEle => itemEle.id === listele.itemId)[0];
                    return [...listacc, {
                        item: itemNameUnit.item,
                        unit: itemNameUnit.unit,
                        quantity: listele.quantity
                    }];
                }, [])

                return [...acc, {
                    userType: "user",
                    orderId: ele.id,
                    userId: ele.userId,
                    user: { mobile: userInfo.mobile, address: userInfo.address, brand: userInfo.brand },
                    orderDate: ele.date,
                    deliveryTime: ele.deliveryTime,
                    paymentMethod: ele.paymentMethod,
                    itemList: itemList,
                    state: ele.state
                }];
            }, []);

            let unknownData = unknownOrderData.reduce((acc, ele) => {
                let userInfo = unknowns.filter(userele => ele.userId === userele.id)[0];
                let orderItems = unknownOrderItems.filter((orderItemsEle) => orderItemsEle.orderId === ele.id);
                let itemList = orderItems.reduce((listacc, listele) => {
                    let itemNameUnit = items.filter(itemEle => itemEle.id === listele.itemId)[0];
                    return [...listacc, {
                        item: itemNameUnit.item,
                        unit: itemNameUnit.unit,
                        quantity: listele.quantity
                    }];
                }, []);

                // unknown 유저는 date column이 존재 하지 않기 때문에 date는 공백으로 둔다.
		
		if(ele.userId==null){ ele.userId = 1}
		console.log(ele.userId)
                ele["date"] = "";
                return [...acc, {
                    userType: "unknown",
                    orderId: ele.id,
                    userId: ele.userId,
                    user: { mobile: userInfo.mobile, address: userInfo.address, brand: userInfo.brand },
                    orderDate: ele.date,
                    deliveryTime: ele.deliveryTime,
                    paymentMethod: ele.paymentMethod,
                    itemList: itemList,
                    state: ele.state
                }];
            }, []);
            let arr = [...userData, ...unknownData];
            let result = arr.sort((a, b) => {
                let first = a.deliveryTime.split("-").join("").split(" ").join("").split(":").join("");
                let second = b.deliveryTime.split("-").join("").split(" ").join("").split(":").join("");
                return second - first
            });
            res.send({ orders: result })
        } catch (err) {
            res.send(err)
        }
    },
    post: async (req, res) => {
        try {
            const { userType, userId, orderId, state } = req.body;
            if (userType === "user") {
                let orderState = await user_order.update(
                    { state: state },
                    { where: { id: orderId, userId: userId } }
                );
                res.send(orderState);
            } else if (userType === "unknown") {
                let orderState = await unknown_order.update(
                    { state: state },
                    { where: { id: orderId, userId: userId } }
                );
                res.send(orderState);
            };
        } catch (err) {
            res.status(400).send(err);
        }
    }
}

const express = require("express");
const router = express.Router();

const { orderController } = require("../controllers");

// POST /order/items
router.post("/order/items", orderController.post);

// POST /order/options
router.post("/order/options", orderController.post);

// POST /order/market
router.post("/order/market", orderController.post);

module.exports = router;

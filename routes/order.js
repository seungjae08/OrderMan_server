const express = require("express");
const router = express.Router();

const { orderController } = require("../controllers");

// POST /order/items
router.post("/items", orderController.items.post);

// POST /order/temp
router.post("/temp", orderController.temp.post);

// POST /order/market
router.post("/market", orderController.market.post);

module.exports = router;

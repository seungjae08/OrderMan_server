const express = require("express");
const router = express.Router();

const { orderController } = require("../controllers");

// POST /order/items
router.post("/items", orderController.items.post);

// POST /order/temp
router.post("/temp", orderController.temp.post);

// GET /order/temp
router.get("/temp", orderController.temp.get);

// POST /order/market
router.post("/market", orderController.market.post);

module.exports = router;

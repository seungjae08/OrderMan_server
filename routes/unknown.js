const express = require("express");
const router = express.Router();

const { unknownController } = require("../controllers");

// POST /order/items
router.post("/info", unknownController.info.post);

module.exports = router;

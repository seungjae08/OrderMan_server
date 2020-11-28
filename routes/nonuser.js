const express = require("express");
const router = express.Router();

const { nonuserController } = require("../controllers");

// POST /order/items
router.post("/info", nonuserController.info.post);

// POST /order/options
router.post("/options", nonuserController.options.post);

module.exports = router;

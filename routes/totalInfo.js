const express = require("express");
const router = express.Router();

const { totalInfoController } = require("../controllers");

// GET /totalInfo
router.get("/", totalInfoController.get);

module.exports = router;

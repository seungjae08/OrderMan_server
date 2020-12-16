const express = require("express");
const router = express.Router();
const { managementController } = require("../controllers");

// GET /management/
router.get("/", managementController.info.get);

// POST /managemnet/
router.post("/", managementController.info.post);

module.exports = router;

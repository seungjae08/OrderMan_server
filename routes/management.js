const express = require("express");
const router = express.Router();
const { managementController } = require("../controllers");

router.get("/", managementController.info.get);
router.post("/", managementController.info.post);
module.exports = router;

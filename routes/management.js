const express = require("express");
const router = express.Router();
const {managementController} =require("../controllers")

router.get("/",managementController.get);

module.exports =router;
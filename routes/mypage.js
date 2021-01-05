const express = require("express");
const router = express.Router();
const {mypageController} =require("../controllers");

router.get("/user",mypageController.user.get);

router.post("/user",mypageController.user.post);

router.post("/password",mypageController.password.post);

router.post("/mobile",mypageController.mobile.post)

module.exports = router
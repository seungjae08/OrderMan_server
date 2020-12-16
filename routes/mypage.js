const express = require("express");
const router = express.Router();
const { mypageController } = require("../controllers");

// GET /mypage/user
router.get("/user", mypageController.user.get);

// POST /mypage/user
router.post("/user", mypageController.user.post);

// POST /mypage/password
router.post("/password", mypageController.password.post);

// POST /mypage/mobile
router.post("/mobile", mypageController.mobile.post);

module.exports = router
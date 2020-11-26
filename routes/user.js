const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

// POST /user/signup
router.post("/user/signup", userController.post);

// POST /user/authup
router.post("/user/authup", userController.post);

// POST /user/login
router.post("/user/login", userController.post);

// GET /user/logout
router.get("/user/logout", userController.get);

module.exports = router;

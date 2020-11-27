const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

// POST /user/signup
router.post("/signup", userController.signup.post);

// POST /user/authup
router.post("/authup", userController.authup.post);

// POST /user/login
router.post("/login", userController.login.post);

// GET /user/logout
router.get("/logout", userController.logout.get);

module.exports = router;

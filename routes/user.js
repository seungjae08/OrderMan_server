const express = require("express");
const router = express.Router();

const { userController } = require("../controllers");

// POST /user/signup
router.post("/signup", userController.signup.post);

// POST /user/oauthup
router.post("/oauthup", userController.oauthup.post);

// GET /user/oauthup
router.get("/oauthup", userController.oauthup.get);

// POST /user/login
router.post("/login", userController.login.post);

// GET /user/login
router.get("/login" , userController.login.get)

// GET /user/logout
router.get("/logout", userController.logout.get);

module.exports = router;

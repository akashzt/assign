const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");


// create a new user
router.post("/user", controller.createUser);
// login user using email and password
router.post("/user/login", controller.loginUser);
// change user password, you have to pass oldPassword and new password and a jwt in header for Auth

module.exports = router;

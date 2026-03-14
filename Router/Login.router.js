const express = require("express");
const router = express.Router();

const LoginController = require("../Controller/Login.controller");
router.post("/register", LoginController.CreateUser);

router.post("/login", LoginController.LoginUser);



module.exports = router;
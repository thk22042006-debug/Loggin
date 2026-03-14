const express = require("express");
const router = express.Router();

const ForgetPassController = require("../Controller/ForgetPass.controller");

router.post("/reset", ForgetPassController.resetPassword);

module.exports = router;

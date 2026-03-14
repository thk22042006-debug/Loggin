const express = require("express");
const router = express.Router();

const { verifyToken } = require("../Middelwares/auth.middelware");
const verifyAdmin = require("../Middelwares/admin.middelware");
const AdminController = require("../Controller/Admin.controller");

router.get("/dashboard", verifyToken, verifyAdmin, AdminController.dashboard);

module.exports = router;
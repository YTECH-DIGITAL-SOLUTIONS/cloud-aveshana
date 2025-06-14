/** @format */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// USER
router.post("/login", authController.loginUser);
router.post("/register", authController.registerUser);

// ADMIN
router.post("/admin/login", authController.loginAdmin);
router.post("/admin/register", authController.registerAdmin);

module.exports = router;

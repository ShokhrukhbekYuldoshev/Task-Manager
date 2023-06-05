const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// User registration route
router.post("/register", authController.registerUser);

// User login route
router.post("/login", authController.loginUser);

// User logout route
router.post("/logout", authMiddleware, authController.logoutUser);

module.exports = router;

const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Placeholder for authentication routes (e.g., login, register)
router.post("/login", (req, res) => {
  // Implement login logic here
  res.json({ message: "Login route" });
});

router.post("/register", authController.registerUser);

module.exports = router;

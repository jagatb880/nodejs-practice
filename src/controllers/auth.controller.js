// Import the user model for database operations
const userModel = require("../models/user.model");
// Import jsonwebtoken for creating JWT tokens
const jwt = require("jsonwebtoken");

/**
 * Register a new user
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
async function registerUser(req, res) {
  try {
    // Destructure user details from request body
    const { username, email, password } = req.body;

    // Check if user already exists by email
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // If user exists, return error response
      return res.status(409).json({ error: "User already exists" });
    }

    // Create a new user in the database
    const user = await userModel.create({ username, email, password });

    // Generate a JWT token for the new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Set the token as an HTTP-only cookie (for security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    // Respond with success, user info, and token
    res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (error) {
    // Handle errors and send error message
    res.status(500).json({ error: error.message });
  }
}

// Export the registerUser controller function
module.exports = { registerUser };

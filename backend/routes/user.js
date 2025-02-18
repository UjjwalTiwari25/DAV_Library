const router = require("express").Router();
const User = require("../models/user"); // Make sure to import the User model
const bcrypt = require("bcrypt"); // For password hashing

// Signup
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Username validation
        if (username.length < 4) {
            return res.status(400).json({ message: "Username must be at least 4 characters" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Password validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        // Remove password from response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            message: "User created successfully",
            user: userResponse
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;
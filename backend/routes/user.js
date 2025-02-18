const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Signup Route
router.post("/sign-up", async (req, res) => {
    console.log("Signup request body:", req.body);
    try {
        const { username, email, password } = req.body;

        // Check for missing fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate username length
        if (username.length < 4) {
            return res.status(400).json({
                success: false,
                message: "Username must be at least 4 characters"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Check existing username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Check existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
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

        // Save user
        await newUser.save();

        // Prepare response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userResponse
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Sign-in Route
router.post("/sign-in", async (req, res) => {
    console.log("Signin request body:", req.body);
    try {
        const { username, email, password } = req.body;

        // Check for missing fields
        if ((!username && !email) || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter your username or email along with your password"
            });
        }

        // Find user by username or email
        const user = await User.findOne({
            $or: [
                { username: username || "" }, 
                { email: email || "" }
            ]
        });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Prepare response
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "Sign in successful",
            user: userResponse
        });

    } catch (error) {
        console.error("Sign-in error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

module.exports = router;
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Format: Bearer <token>

        if (!token) {
            return res.status(401).json({ message: "Authentication token required" });
        }

        jwt.verify(token, process.env.JWT_SECRET , async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Token expired or invalid. Please sign in again." });
            }

            const user = await User.findById(decoded.id).select("-password"); // Exclude password
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            req.user = user; // Attach user to request
            next();
        });

    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { authenticateToken };

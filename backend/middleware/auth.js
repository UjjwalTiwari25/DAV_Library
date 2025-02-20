const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.get("Authorization"); // Case-insensitive

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.log("❌ No token provided");
            return res.status(401).json({ message: "Authentication token required" });
        }

        const token = authHeader.split(" ")[1].trim();

        console.log("🔹 Received Token:", token);

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("🔹 Decoded Token:", decoded);

        // Fetch user and exclude password
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            console.log("❌ User not found in DB");
            return res.status(404).json({ message: "User not found. Please sign in again." });
        }

        console.log("✅ Authenticated User:", user.username, "| Role:", user.role);

        req.user = user; // Attach user to request
        next();

    } catch (error) {
        console.error("Authentication error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token expired. Please sign in again." });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(403).json({ message: "Invalid token. Please sign in again." });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { authenticateToken };

const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

// Add book (Admin only)
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { url, title, author, desc, language } = req.body;

        if (!url || !title || !author || !desc || !language) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const book = new Book({ url, title, author, desc, language });

        await book.save();
        res.status(201).json({ message: "Book added successfully", book });

    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

module.exports = router;

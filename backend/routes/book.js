// routes/books.js
const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("../middleware/auth"); // Note the path change

// Add book (Admin only)
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const user = req.user;
        
        // Debug log
        console.log("User attempting to add book:", user);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ 
                message: "Access denied. Admins only.",
                userRole: user ? user.role : 'no user found'
            });
        }

        const { url, title, author, desc, language } = req.body;

        // Validate all required fields
        if (!url || !title || !author || !desc || !language) {
            return res.status(400).json({ 
                message: "All fields are required.",
                received: { url, title, author, desc, language }
            });
        }

        // Create new book with reference to admin who added it
        const book = new Book({
            url,
            title,
            author,
            desc,
            language,
            addedBy: user._id // Add reference to admin
        });

        await book.save();
        
        res.status(201).json({ 
            message: "Book added successfully", 
            book: await book.populate('addedBy', 'name email') // Populate admin details
        });

    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ 
            message: "Internal server error", 
            error: error.message 
        });
    }
});

// Get all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().populate('addedBy', 'name email');
        res.json(books);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching books", 
            error: error.message 
        });
    }
});

module.exports = router;
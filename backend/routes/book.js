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
        console.log(`User (ID: ${user._id}, Role: ${user.role}) attempting to add book.`);

        if (!user || user.role !== "admin") {
            return res.status(403).json({ 
                status: "Error",
                message: "Access denied. Admins only.",
                userRole: user ? user.role : 'no user found'
            });
        }

        const { url, title, author, category, language, available } = req.body;

        // Validate all required fields
        if (!url || !title || !author || !category || !language || !available) {
            return res.status(400).json({ 
                status: "Error",
                message: "All fields are required.",
                received: { url, title, author, category, language, available }
            });
        }

        // Create new book with reference to admin who added it
        const book = new Book({
            url,
            title,
            author,
            category,
            language, 
            available,
            addedBy: user._id // Add reference to admin
        });

        await book.save();
        
        res.status(201).json({ 
            status: "Success",
            message: "Book added successfully", 
        });

    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ 
            status: "Error",
            message: "Internal server error", 
            error: error.message 
        });
    }
});

// Update Book Route
router.put("/update-book/:id", authenticateToken, async (req, res) => {
    try {
        // Ensure req.user exists
        if (!req.user) {
            console.warn("❌ Unauthorized access attempt.");
            return res.status(401).json({ 
                status: "Error",
                message: "Unauthorized. Please log in." 
            });
        }

        const { id } = req.params;
        const { url, title, author, category, language, available } = req.body;
        const user = req.user;

        console.log(`🔹 User ${user.username} (Role: ${user.role}) is attempting to update book ID: ${id}`);

        // Only admins can update books
        if (user.role !== "admin") {
            console.warn("❌ Access denied for non-admin user.");
            return res.status(403).json({
                status: "Error",
                message: "Access denied. Admins only.",
                userRole: user.role
            });
        }

        // Validate input: At least one field must be provided for update
        if (!url && !title && !author && !category && !language && !available) {
            console.warn("⚠️ No fields provided for update.");
            return res.status(400).json({
                status: "Error",
                message: "At least one field must be updated.",
                received: req.body
            });
        }

        // Find and update the book
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { $set: { url, title, author, category, language, available } },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            console.warn("❌ Book not found for ID:", id);
            return res.status(404).json({ 
                status: "Error",
                message: "Book not found." 
            });
        }

        console.log("✅ Book updated successfully:", updatedBook);
        res.status(200).json({
            status: "Success",
            message: "Book updated successfully",
            updatedBook
        });

    } catch (error) {
        console.error("❌ Error updating book:", error);
        res.status(500).json({
            status: "Error",
            message: "Internal server error",
            error: error.message
        });
    }
});

// Delete Book (Admin only)
router.delete("/delete-book/:id", authenticateToken, async (req, res) => {
    try {
        const user = req.user;

        // Debug log
        console.log(`User (ID: ${user._id}, Role: ${user.role}) attempting to delete book.`);

        if (!user || user.role !== "admin") {
            return res.status(403).json({
                status: "Error",
                message: "Access denied. Admins only.",
                userRole: user ? user.role : 'no user found'
            });
        }

        const { id } = req.params;

        // Find and delete the book
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ 
                status: "Error",
                message: "Book not found." 
            });
        }

        res.status(200).json({ 
            status: "Success",
            message: "Book deleted successfully", 
            deletedBook 
        });

    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ 
            status: "Error",
            message: "Internal server error", 
            error: error.message 
        });
    }
});

// Get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.status(200).json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({ 
            status: "Error",
            message: "Error fetching books", 
            error: error.message 
        });
    }
});

// Get recently added books (limit 4)
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.status(200).json({
            status: "Success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({ 
            status: "Error",
            message: "Error fetching books", 
            error: error.message 
        });
    }
});

// Get book details by ID
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                status: "Error",
                message: "Book not found",
            });
        }

        return res.status(200).json({
            status: "Success",
            data: book,
        });

    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ 
            status: "Error",
            message: "Error fetching book", 
            error: error.message 
        });
    }
});

module.exports = router;
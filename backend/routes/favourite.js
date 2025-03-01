const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const Book = require("../models/book");

// Add to favorites
router.post('/add-favorite/:bookId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const bookId = req.params.bookId;

        if (!user.favorites.includes(bookId)) {
            user.favorites.push(bookId);
            await user.save();
        }

        res.status(200).json({
            status: "Success",
            message: "Book added to favorites"
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to add favorite"
        });
    }
});

// Remove from favorites
router.post('/remove-favorite/:bookId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const bookId = req.params.bookId;

        user.favorites = user.favorites.filter(id => id.toString() !== bookId);
        await user.save();

        res.status(200).json({
            status: "Success",
            message: "Book removed from favorites"
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to remove favorite"
        });
    }
});

// Check if book is in favorites
router.get('/check-favorite/:bookId', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const isFavorite = user.favorites.includes(req.params.bookId);

        res.status(200).json({
            status: "Success",
            isFavorite
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to check favorite status"
        });
    }
});

// Get all favorite books
router.get('/get-favorites', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('favorites');
        
        res.status(200).json({
            status: "Success",
            data: user.favorites
        });
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message: "Failed to fetch favorites"
        });
    }
});

// Get favourite books for a particular user
router.get("/get-my-favourite-books", auth, async (req, res) => {
    try {
        const { id } = req.headers;
        
        // First get the user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Then get the books directly
        const favouriteBooks = await Book.find({
            _id: { $in: user.favorites }
        });
        
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    } catch (error) {
        console.error("Favourite Books Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
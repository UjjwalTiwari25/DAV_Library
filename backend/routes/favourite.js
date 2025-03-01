const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("../middleware/auth");

// Add book to favourites
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourites" });
        }
        
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to favourites" });
    } catch (error) {
        console.error("User Info Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete book from favourites
router.put("/remove-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
        }
        
        return res.status(200).json({ message: "Book removed from favourites" });
    } catch (error) {
        console.error("User Info Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get favourite books for a particular user
router.get("/get-my-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        // First get the user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Then get the books directly
        const favouriteBooks = await Book.find({
            _id: { $in: user.favourites }
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
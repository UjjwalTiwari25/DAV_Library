const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const { title, category, imageUrl, available } = req.body;

    if (!title || !category || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      title,
      category,
      imageUrl,
      available: available ?? true
    });

    const savedBook = await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
};
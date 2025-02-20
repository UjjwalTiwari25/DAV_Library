const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  try {
    const { url, title, author, description, language } = req.body;

    // Validate required fields based on schema
    if (!url || !title || !author || !description || !language) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      url,
      title,
      author,
      description,
      language
    });

    const savedBook = await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: savedBook });
  } catch (error) {
    res.status(500).json({ message: "Error adding book", error: error.message });
  }
};

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books", error: error.message });
  }
};

// Get single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book", error: error.message });
  }
};

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { url, title, author, description, language } = req.body;
    
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        url,
        title,
        author,
        description,
        language
      },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error: error.message });
  }
};

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error: error.message });
  }
};
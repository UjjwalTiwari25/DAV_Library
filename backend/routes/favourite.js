const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("../middleware/auth"); // Note the path change

//add book to favourites

module.exports = router;
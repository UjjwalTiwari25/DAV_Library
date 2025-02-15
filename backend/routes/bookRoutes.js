const express = require("express");
const router = express.Router();
const { addBook } = require("../controllers/bookController");

router.post("/", addBook);

module.exports = router;
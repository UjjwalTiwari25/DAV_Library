require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./connection/conn");

// Connect to MongoDB
connectDB();

// Creating Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

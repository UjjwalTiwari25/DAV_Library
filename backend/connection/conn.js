const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("Connecting to:", process.env.URI); // Debugging line
        await mongoose.connect(process.env.URI);
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = connectDB;

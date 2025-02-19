require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const connectDB = require("./connection/conn");
const userRoutes = require("./routes/user");
const bookRoutes= require("./routes/book");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Connect to MongoDB with error handling
const startServer = async () => {
    try {
        await connectDB();
        console.log("Connected to MongoDB");

        // Routes
        app.use("/api/v1", userRoutes);
        app.use("/api/v1",bookRoutes);

        // 404 handler
        app.use((req, res) => {
            res.status(404).json({ message: "Route not found" });
        });

        // Error handling middleware
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(err.status || 500).json({
                message: err.message || "Internal Server Error"
            });
        });

        // Start server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
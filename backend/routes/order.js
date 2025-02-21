const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
const { authenticateToken } = require("../middleware/auth");

// Place order --- user
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        // Validate order data
        if (!order || !Array.isArray(order) || order.length === 0) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid order data"
            });
        }

        // Process each book in the order
        for (const orderData of order) {
            // Create new order
            const newOrder = new Order({
                user: id,
                book: orderData._id
            });
            
            // Save order and update user's orders and cart
            const orderDataFromDb = await newOrder.save();
            
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
                $pull: { cart: orderData._id }
            });
        }

        return res.json({
            status: "Success",
            message: "Order placed successfully",
        });
    } catch (error) {
        console.error("Order Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get order history --- user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers; // Ensure ID is passed correctly

        if (!id) {
            return res.status(400).json({
                status: "Failed",
                message: "User ID is required",
            });
        }

        const userData = await User.findById(id).populate({
            path: "order",
            populate: {
                path: "book",
                select: "-__v", // Exclude version key
            },
        });

        if (!userData) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
            });
        }

        const orderData = userData.order.reverse() || [];

        return res.json({
            status: "Success",
            data: orderData,
        });
    } catch (error) {
        console.error("Order History Error:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});


// Get all orders --- admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                status: "Failed",
                message: "Access denied. Admin only."
            });
        }

        const userData = await Order.find()
            .populate("book", "-__v")
            .populate("user", "-password -__v")
            .sort({ createdAt: -1 });

        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        console.error("Get All Orders Error:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

// Update order status --- admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                status: "Failed",
                message: "Access denied. Admin only."
            });
        }

        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        if (!status || !['pending', 'confirmed', 'delivered', 'cancelled'].includes(status)) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid status"
            });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                status: "Failed",
                message: "Order not found"
            });
        }

        return res.json({
            status: "Success",
            message: "Status updated successfully",
            data: updatedOrder
        });
    } catch (error) {
        console.error("Update Status Error:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
});

module.exports = router;
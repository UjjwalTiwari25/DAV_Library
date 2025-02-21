const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("../middleware/auth");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for(const orderData of order){
            const newOrder = new Order({
                user: id,
                book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromDb._id } });

            //clearing cart
            await User.findByIdAndUpdate(id, {$push: { cart: orderData._id } });
        }
        return res.json({
            success: Success,
            message: "Order placed successfully",
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
         
});

module.exports = router;
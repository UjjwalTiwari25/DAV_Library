const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");

const { authenticateToken } = require("../middleware/auth");

//place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for(const orderData of order)
        {
            const newOrder = new Order({
                user: id,
                book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, { $push: { orders: orderDataFromDb._id } });

            //clearing cart
            await User.findByIdAndUpdate(id, {$pull: { cart: orderData._id } });
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

//get order history of a particular user
router.get("/get-order-history",authenticateToken , async(req,res)=>{
    try{
        const { id } =req.headers;
        const userData = await User.findById(id).populate({
            path : "orders",
            populate: {path: "book"},
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"An error occures"});
    }
});

//get all orders ---admin
router.get("/get-all-orders", authenticateToken ,async (req , res) => {
    try {
        const userData = await Order.find()
        .populate({
            path: "book",
        }).populate({
            path : "user",
        }).sort({ createdAt: -1});

        return res.json({
            status: "Success",
            data : userData,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"An error occures"});
    }
});

module.exports = router;

 
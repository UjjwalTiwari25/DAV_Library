const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("../middleware/auth");

// add book to cart
router.put("/add-to-cart" , authenticateToken,async(req,res)=>{
    try{
        const {bookid , id}=req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);

        if(isBookinCart){
            return res.json({
                status: "Success",
                message: "Book is already in cart",
            });
        }
        await User.findByIdAndUpdate(id ,
            {$push: {cart :bookid},
        });

        return res.json({
            status: "Success",
            message: "Book added to cart",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//remove book from cart
router.put("/remove-from-cart/:bookid" , authenticateToken,async(req,res)=>{
    try{
        const { bookid } =  req.params;
        const { id } = req.headers;

        await User.findByIdAndUpdate(id,{
            $pull :{ cart: bookid },
        });

        return res.json({
            status: "Success",
            message: "Book removed from cart",
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "An error occurred"});
    }
});

//get cart of a particular user
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        
        // First get the user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Then get the books in the cart
        const cartBooks = await Book.find({
            _id: { $in: user.cart }
        });
        
        return res.json({
            status: "Success",
            data: cartBooks,
        });
    } catch (error) {
        console.error("Cart Books Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
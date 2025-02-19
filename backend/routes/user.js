const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");

// Signup Route
router.post("/sign-up", async (req, res) => {
    console.log("Signup request body:", req.body);
    try {
        const { username, email, password } = req.body;

        // Check for missing fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate username length
        if (username.length < 4) {
            return res.status(400).json({
                success: false,
                message: "Username must be at least 4 characters"
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Check existing username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        // Check existing email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save user
        await newUser.save();

        // Prepare response
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: userResponse
        });

    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Sign-in Route
router.post("/sign-in", async (req, res) => {
    try{
        const{username,password}= req.body;

        const existingUser = await User.findOne({username});

        if(!existingUser){
            res.status(400).json({message :"Invalid credentials"});
        }

        await bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[
                    {name:existingUser.username},
                    {role:existingUser.role},

                ]
                const token =jwt.sign({authClaims}, process.env.JWT_SECRET ,{expiresIn:"14d"});
                res.status(200).json({id:existingUser._id , 
                                      role:existingUser.role, 
                                      token:token,
                                    });
            }
            else{
                res.status(400).json({message:"Invalid credentials"});
            }
        });
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }
});

//get user-information
router.get("/get-user-information",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const data= await User.findById(id).select("-password");
        return res.status(200).json(data);

    }catch(error){
        res.status(500).json({message:"Internal Server Error"});
    }
});
   
module.exports = router;
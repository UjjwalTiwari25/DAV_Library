const mongoose=require('mongoose');
const user=new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },
    
    avatar:{
        type:String,
        default:"avatar.png",
    },

    role:{
        type:String,
        default:"user",
        enum:["user","admin"],
    },
    
    favourites:[{type:mongoose.Types.ObjectId,
        ref:"Book"}],
},

{timestamps:true}

);
module.exports=mongoose.model("user",user);
const mongoose=require('mongoose');

const order=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    books:{
        type:mongoose.Types.ObjectId,
        ref:"book",
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed","Come and Take,Unavailable"],
    },

    },
    {timestamps:true}
);

module.exports=mongoose.model("order",order);
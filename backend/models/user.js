const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "avatar.png",
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    order: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        },
    ],
},
{timestamps: true}
);

module.exports = mongoose.model("user", user);
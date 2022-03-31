const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    orderid: {
        type: String,
        required: true,
    },
    receipt: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
    },
    status: {
        type: String,
    }



});


const User = mongoose.model("order", userSchema);
module.exports = User;
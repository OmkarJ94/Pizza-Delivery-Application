const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    Small: {
        type: Number,

    },
    Medium: {
        type: Number,


    },
    Large: {
        type: Number,
    },

    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    },
    category: {
        type: String,
    }
});

const Pizza = mongoose.model("pizzalist", userSchema);
module.exports = Pizza;
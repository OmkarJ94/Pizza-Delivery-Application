const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ]

});
userSchema.methods.generateAuthToken = async function () {

    try {

        let userToken = jwt.sign(
            { _id: this._id }
            , process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: userToken });
        await this.save()
        return userToken;
    } catch (error) {
 
    }
};


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});





const User = mongoose.model("user", userSchema);
module.exports = User;
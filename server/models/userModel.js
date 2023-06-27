const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Enter your name"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Enter your email"],
        }, 
        password: {
            type: String,
            minlength: [8, "Password must be of atleast 8 chars"],
            required: [true, "Enter password"],
        },
        role: {
            type:String,
            default:"user",
        },       
    }
)

const User = mongoose.model("User",userSchema)
module.exports = User;


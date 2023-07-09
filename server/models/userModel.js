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
        dateOfBirth: {
            type: Date,
            // required: true
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        },
        address: {
            type: String,
            // required: true,
        },
        state: {
            type: String,
            // required: true
        },
        zip: {
            type: Number,
            // required: true,
        },
        phone: {
            type: Number,
            // required: true
        },
        emergencyContact: {
            type: Number,
            // required: true
        },
        image: {
            type: String
        },
        medicalDoc: {
            type: String
        }               
    }
)

const User = mongoose.model("User",userSchema)
module.exports = User;


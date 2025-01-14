import mongoose from "mongoose";
import validator from "validator"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide username"],
        minLength: [3, "Username should be greater than 3 letters"],
        maxLength :[30, "Username not exceed 30 letters"]
    }, 

    email:{
        type: String,
        required: [true, "Please provide your email Id"],
        validate: [validator.isEmail, "Email is not valid"]
    },

    password: {
        type: String,
        required: [true, "Please provide your password"],
        minLength: [8, "Password atleast contain 8 letters"],
    },
    
    role:{
        type: String,
        required: [true, "Please provide your Role"],
        enum: ["JobSeeker", "Employer"]
    }, 

    phone:{
        type: String,
        required: [true, "Please provide your contact no"],
        minLength: [10, "Contact no should contain 10 digits"],
        maxLength: [10, "Contact no should contain 10 digits"],
    },

    created_at:{
        type: Date,
        default: Date.now
    }
    
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next;
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(enterpassword){
    return await bcrypt.compare(enterpassword, this.password);
}

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
}

export const User = mongoose.model("User", userSchema);
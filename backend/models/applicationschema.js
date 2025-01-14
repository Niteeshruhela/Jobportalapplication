import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide your username"],
        minLength: [3, "Username should contain atleast 3 char"],
        maxLength: [30, "Username atmost contain atmost 30 char"]
    },

    email: {
        type: String,
        required: [true, "Provide your email"],
        validate: [validator.isEmail, "Provide valid email"]
    }, 

    coverletter: {
        type: String,
        required: [true, "Provide your coverletter"]
    },

    phone: {
        type: Number,
        required: [true, "Provide your phone number"],
        minLength: [10, "Contact no must conatin 10 numbers"],
        maxLength: [10, "Contact no must contain 10 numbers"]
    },

    address:{
        type: String,
        required: [true, "Provide your permanent address"]
    },

    resume: {
        public_id:{
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },

    applicantid: {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role:{
            type: String,
            enum: ["JobSeeker"],
            required: true,
        }
    },

    employerid: {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role:{
            type: String,
            enum: ["Employer"],
            required: true,
        }
    }
})

export const Application = mongoose.model("Application", applicationSchema);
import mongoose from "mongoose";

const jobschema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Provide title of job"],
        minLength: [3, "Title atleast contain three letters"],
        maxLength: [30, "Title atmost contain three letters"]
    }, 

    description: {
        type: String,
        required: [true, "Provide description of job"],
        minLength: [5, "Description needs to be alteast 50 letters"], 
        maxLenght: [350, "Description atmost contain 350 letters"]
    },

    country: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
        minLength: [5, "Location atleast contain 5 letters"],
        maxLength: [50, "Location atmost contain 50 letters"]
    },

    fixedsalary: {
        type: Number,
        minLength: [4, "Minimum Salary atleast contain 4 Number"],
        maxLength: [9, "Maximum Salary atmost contain 9 Number"]
    },

    Salaryfrom: {
        type: Number,
        minLength: [4, "Minimum starting Salary atleast contain 4 Number"],
        maxLength: [9, "Maximum starting Salary atmost contain 9 Number"]
    },
    
    Salaryto: {
        type: Number,
        minLength: [4, "Minimum Salary ends contain atleast  4 Number"],
        maxLength: [9, "Maximum Salary ends contain atmost 9 Number"]
    },

    jobpostedon: {
        type: Date,
        default: Date.now(),
    },

    jobexpires:{
        type: Boolean,
        default: false
    },

    jobpostedby: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    }
    
})

export const Job = mongoose.model("Job", jobschema)
import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import { sendtoken } from "../utils/jwttoken.js";

export const register = catchasyncerror(async(req, res, next) => {
    const {username, email, password, role, phone} = req.body;
    if(!username || !email || !password || !role || !phone){
        return next(new ErrorHandler("Fill all the details", 400));
    }

    const isemail = await User.findOne({ email });
    if(isemail){
        return next(new ErrorHandler("User Already registered", 400))
    }

    const user = await User.create({username, email, password, role, phone});
    sendtoken(user, 200, res, "User Registered succesfully!")
})

export const login = catchasyncerror(async(req, res, next) => {
    const {email, password, role} = req.body

    if(!email || !role || !password){
        return next(new ErrorHandler("Provide all the details", 400))
    }

    const user = await User.findOne({email})
    if(!user) {
        return next(new ErrorHandler("Invalid email and password", 400));
    }
    const ispassword = await user.comparePassword(password);

    if(!ispassword){
        return next(new ErrorHandler("Incorrect Password", 400))
    }

    if(role !== user.role){
        return next(new ErrorHandler("Provide correct role!", 400));
    }

    sendtoken(user, 200, res, "User Login Successfully")

})

export const logout = catchasyncerror(async(req, res, next) => {
    await res.status(201).cookie("token", "", {
        httpOnly: false,
        expires: new Date(Date.now()),
    }).json({
        success: false,
        message: "User logged Out Successfully!"
    })
})

export const getuser = catchasyncerror(async(req, res, next) => {
    const user = req.user;

    res.status(200).json({
        success: true,
        user
    })
})
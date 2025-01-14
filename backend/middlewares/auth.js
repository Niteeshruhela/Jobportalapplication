import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { catchasyncerror } from "./catchasyncerror.js";
import ErrorHandler from "./error.js";


export const isAuthorized = catchasyncerror(async (req, res, next) => {
    const { token } = req.cookies;  
    if(!token){
        return next(new ErrorHandler("User not authorized", 400))
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET) 

    req.user = await User.findById(decoded.id);

    next();
})
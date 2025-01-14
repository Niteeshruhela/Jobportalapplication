import mongoose from "mongoose";

export const dbconnection = () => {
    mongoose.connect(process.env.MONGOOSE_URL).then(()=>{
        console.log("server connected to database");
    }).catch((err)=>{
        console.log("server not connected to database")
    })
}

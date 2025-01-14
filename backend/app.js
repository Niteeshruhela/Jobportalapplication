import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {dbconnection} from "./database/dbconnection.js";
import mongoose from "mongoose";
import { errormiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRoute from "./routes/userRouter.js"
import jobRoute from "./routes/jobRouter.js"
import applicationRoute from "./routes/applicationRouter.js"

const app = express();

dotenv.config({path: "./config/config.env"})
app.use(
    cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}))


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/"
    })
)

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

dbconnection();
app.use(errormiddleware);


export default app;
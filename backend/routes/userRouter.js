import express from "express";
import { getuser, register } from "../controller/usercontroller.js";
import { login } from "../controller/usercontroller.js";
import { logout } from "../controller/usercontroller.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthorized, logout);
router.get("/getuser", isAuthorized, getuser);

export default router;
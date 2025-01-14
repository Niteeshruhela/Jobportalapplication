import express from "express";
import { employergetallapplication, jobseekerdeleteapplication, jobseekergetallapplication, postapplication } from "../controller/applicationcontroller.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/jobseeker/getapplication", isAuthorized, jobseekergetallapplication)
router.get("/employer/getapplication", isAuthorized, employergetallapplication)
router.delete("/delete/:id", isAuthorized, jobseekerdeleteapplication)
router.post("/jobseekerapplication/post", isAuthorized, postapplication)


export default router;
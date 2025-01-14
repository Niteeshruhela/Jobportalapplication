import express from "express";
import { deletejob, getalljobs, getmyjobs, getSingleJob, updatejob } from "../controller/jobcontoller.js";
import { postedjob } from "../controller/jobcontoller.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getalljobs", getalljobs);
router.post("/postedjob", isAuthorized, postedjob);
router.get("/getmyjobs", isAuthorized, getmyjobs);
router.put("/update/:id", isAuthorized, updatejob);
router.delete("/delete/:id", isAuthorized, deletejob);
router.get("/:id", isAuthorized, getSingleJob);

export default router;
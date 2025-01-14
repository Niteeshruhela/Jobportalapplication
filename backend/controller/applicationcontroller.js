import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationschema.js";
import { Job } from "../models/jobschema.js";
import cloudinary from "cloudinary"

export const jobseekergetallapplication = catchasyncerror(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not able access the resource!", 400))
    }

    const {_id} = req.user;
    const applications = await Application.find({"applicantid.user": _id})
    res.status(200).json({
        success: true,
        applications
    })
})

export const employergetallapplication = catchasyncerror(async(req, res, next) => {
    const {role} = req.user;
    if(role === "JobSeeker"){
        return next(new ErrorHandler("Job seeker is not able access the resource!", 400))
    }

    const {_id} = req.user;
    const applications = await Application.find({"employerid.user": _id})
    res.status(200).json({
        success: true,
        applications
    })
})

export const jobseekerdeleteapplication = catchasyncerror(async(req, res, next) => {
    const {role} = req.user;
    if(role === "Employer"){
        return next(new ErrorHandler("Employer is not able access the resource!", 400))
    }

    const { id } = req.params;
    let job = await Application.findById(id);
    if(!job){
        return next(new ErrorHandler("Oops, Application not found!", 404))
    }
    
    await job.deleteOne();

    res.status(200).json({
        success: true,
        message: "Application deleted succesfully"
    })
})

export const postapplication = catchasyncerror(async(req, res, next) => {
    const {role} = req.user
    if(role === "Employer"){
        return next(new ErrorHandler("Employer not allowed to access this resource!", 400))
    }

    //check wheather they upload resume or not
    if(!req.files || Object.keys(req.files).length == 0){
        return next(new ErrorHandler("Please upload your resume!", 400))
    }

    const {resume} = req.files

    //check formet of resume
    const allowedformat = ["image/png", "image/webp", "image/jpg"]

    if(!allowedformat.includes(resume.mimetype)){
        return next(new ErrorHandler("Please upload resume in correct format", 400));
    }

    //upload on cloud
    const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath
    )
    
    if(!cloudinaryResponse || cloudinaryResponse.error){
        console.error("Cloudinary showing an error", cloudinaryResponse.error || 
            "Unknown cloudinary error"
        )
        return next(new ErrorHandler("resume not able to upload!", 500));
    }

    const {name, email, coverletter, phone, address, jobid} = req.body;

    if(!jobid){
        return next(new ErrorHandler("Please provide job id!", 400))
    }

    
    const applicantid = {
        user: req.user._id,
        role: "JobSeeker"
    }

    const jobdetails = await Job.findById(jobid);
    if(!jobdetails){
        return next(new ErrorHandler("Job is not found!", 400))
    }

    const employerid = {
        user: jobdetails.jobpostedby,
        role: "Employer"
    }

    // if(!name || !email || !coverletter || !phone || !address || !employerid || !applicantid){
    //     return next(new ErrorHandler("Fill all the details carefully", 400))
    // }


    const application = await Application.create({name, email, coverletter, phone, address, applicantid, employerid, resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url
    }})

    res.status(200).json({
        success: true,
        message: "Application submitted successfully!",
        application
    })

})
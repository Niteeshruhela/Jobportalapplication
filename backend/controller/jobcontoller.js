import { catchasyncerror } from "../middlewares/catchasyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobschema.js";
import { User } from "../models/user.js";

export const getalljobs = catchasyncerror(async(req, res, next) => {
    const jobs = await Job.find({jobexpires: false})

    res.status(200).json({
        success: true,
        jobs
    })
})

export const postedjob = catchasyncerror(async(req, res, next) => {
    const {role} = req.user
    if(role === "JobSeeker"){
        return next(new ErrorHandler("Job Seekers not authorised to this section!"))
    }
    const {title, description, country, city, location, fixedsalary, Salaryfrom, Salaryto} = req.body;

    if(!title || !description || !country || !city || !location){
        return next(new ErrorHandler("Provide all information carefully!", 400))
    }

    if(!fixedsalary && (!Salaryfrom && !Salaryto)){
        return next(new ErrorHandler("Please provide either fixed salary or ranged salary", 400))
    }

    if(fixedsalary && Salaryfrom && Salaryto){
        return next(new ErrorHandler("You cannot provide both salary simultaneously!", 400))
    }

    const jobpostedby = req.user._id

    const job = await Job.create({title, description, country, city, location, fixedsalary, Salaryfrom, Salaryto, jobpostedby})

    res.status(200).json({
        success: true,
        message: "Job posted successfully!",
        job
    })

})  

export const getmyjobs = catchasyncerror(async(req, res, next) => {
    const {role} = req.user;
    if(role === "JobSeeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource!", 400))
    }

    const job = await Job.find({jobpostedby: req.user._id})

    res.status(200).json({
        success: true,
        job,
    })
})

export const updatejob = catchasyncerror(async(req, res, next) => {
    const {role} = req.user;
    if(role === "JobSeeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource!", 400))
    }

    const { id } = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oops job Not Found!", 404))
    }

    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true, 
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: "Job updated succesfully"
    })
    
})

export const deletejob = catchasyncerror(async(req, res, next) => {
    const {role} = req.user;
    if(role === "JobSeeker"){
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource!", 400))
    }

    const { id } = req.params;
    let job = await Job.findById(id);
    if(!job){
        return next(new ErrorHandler("Oops job Not Found!", 404))
    }

    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted succesfully"
    })
    
})

export const getSingleJob = catchasyncerror(async(req, res, next) => {
    const {id} = req.params;
    try {
        const job = await Job.findById(id);
        if(!job){
            return next(new ErrorHandler("Job not Found", 404));
        }
        res.status(200).json({
            success: true, 
            job,
        })
    } catch (error) {
        return next(new ErrorHandler("Invalid Error/Cast Error", 400));
    }
})
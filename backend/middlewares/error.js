class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode;
    }
}

export const errormiddleware = (err, req, res, next)=>{    
    err.message = err.message || "Internal server error"
    err.statusCode = err.statusCode || "500"

    if(err.name === "CaseError"){
        const mssge = `Resources Not Found. Invalid ${err.path}`
        err = new ErrorHandler(mssge, 400)
    }

    if(err.code === 11000){
        const mssge = `Duplicate ${Object.keys(err.keyValue)} found`
        err = new ErrorHandler(mssge, 400)
    }

    if(err.name === "JsonWebTokenError"){
        const mssge = `Token Not found`
        err = new ErrorHandler(mssge, 400)
    }

    if(err.name === "TokenExpiredError"){
        const mssge = `Token is not found try again`
        err = new ErrorHandler(mssge, 400)
    }


    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}

export default ErrorHandler
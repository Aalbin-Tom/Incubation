const notFound=(req,res,next)=>{
    const errror =new Error(`Not Founy ${req.originalUrl}`)
    res.this.status(404)
    next(errror)
}


const errorHandler = (err,req,res,next)=>{
    const statusCode= res.statusCode===200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message:err.message,

    })
}

module.exports = {notFound, errorHandler }
const errorMiddleware = (err,req,res,next)=>{
    try{
        let error = {...err};
        error.message =err.message;
        console.error(err);
        //mongoose bad objectId
        if(err.name === 'CastError')
        {
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
            
        }
        //Mongoose duplicate error
        if(err.code===11000)
        {
            const message = 'Duplicate value entered';
            error = new Error(message);
            error.statusCode = 400;
        }
        //Mongoose validation error
        if(err.name === 'ValidationError')
        {
            let errors = Object.values(err.errors).map(val=>val.message);
            error = new Error(errors.join(', '));
            error.statusCode = 400;
        }
        res.status(error.statusCode || 500).json({success:false,error:error.message||'Server Error'});

    }
    catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}
export default errorMiddleware;
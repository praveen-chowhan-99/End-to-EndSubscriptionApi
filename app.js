import express from 'express';
import mongodb from './Database/mongodb.js';
import cookieParser from 'cookie-parser';
import {PORT} from './config/env.js';
import authRouter from './routers/auth.routes.js';
import subscriptionRouter from './routers/subscription.route.js';
import userRouter from './routers/user.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import arcjetMiddleware from './middleware/arcjet.middleware.js';
import cors from 'cors';
import workflowRouter from './routers/workflow.routes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
if(process.env.NODE_ENV !== 'development') {
    app.use(arcjetMiddleware);
} 
app.use(cors());  
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/subscriptions",subscriptionRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/workflows",workflowRouter);

app.use(errorMiddleware);
app.get('/',(req,res)=>{
    res.send('Welcome to the subscription Tracker API');
})
mongodb(); // Connect to MongoDB database

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);  // server is listening on port 
})

export default app;
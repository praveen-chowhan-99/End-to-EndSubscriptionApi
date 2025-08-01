 import mongoose  from "mongoose";
 import bcrypt from 'bcryptjs';
 import jwt from 'jsonwebtoken';
 import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
 import User from '../models/users.model.js';
export const signUp = async (req, res, next) => {
    // Implement sign up functionality
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Logic to create an new user
        const {name, email,password}=req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error =  new Error('Email already exists');
            error.statusCode = 409;
            throw error;
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUsers = await User.create([{name,email,password:hashedPassword}],{session});
        const token = jwt.sign({userId:newUsers[0]._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN})
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data:{
                token,
                user:newUsers[0],
            }

            });

    }
    
    catch (error) {
       await session.abortTransaction();
       session.endSession();
       next(error);
    }


}

export const signIn = async (req, res, next) => {
    // Implement sign in functionality
    try{
        const {email, password}=req.body;
        const user = await User.findOne({email});
        if(!user){
            const error =  new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const error =  new Error('Invalid credentials (password)');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign({userId:user._id},JWT_SECRET,{expiresIn:JWT_EXPIRES_IN});
        res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data:{
                token,
                user,
            }
        });

    }
    catch (error) {
        next(error);// goes to error handling middleware
    }

}

export const signOut = async (req, res, next) => {
    // Implement sign out functionality
}
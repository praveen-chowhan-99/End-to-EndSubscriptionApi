import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/users.model.js';
const authorize = async (req, res, next) => { // Middleware to authorize user
    try{

        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            token = req.headers.authorization.split( ' ')[1];
        }
        if(!token)
        {
            return res.status(401).json({
                success: false,
                message: 'token not found',
            });
        }
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find the user by ID
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized',
            });
        }
        // Attach the user to the request object
        req.user = user;
        next();


    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized access',
            error: error.message
        });
    }
}
export default authorize;
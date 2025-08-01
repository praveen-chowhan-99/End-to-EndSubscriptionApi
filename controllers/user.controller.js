import User from '../models/users.model.js'

export const getUsers = async (req, res, next) => { // get all users

    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    }
    catch (error) {
        next(error);
    }
}
export const getUser = async (req, res, next) => {// get user by id

    try{
        const users = await User.findById(req.params.id).select('-password');
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
        if(!users){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
    }
    catch (error) {
        next(error);
    }
}

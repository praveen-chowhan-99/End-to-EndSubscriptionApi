import {Router} from 'express';
import {getUsers} from '../controllers/user.controller.js';
import {getUser} from '../controllers/user.controller.js';
import authorize from '../middleware/auth.middleware.js';
const userRouter = Router();
userRouter.get('/',getUsers);
userRouter.get('/:id',authorize,getUser);
userRouter.post('/',(req,res)=>{res.send({title:'CREATE a new User'})});
userRouter.put('/:id',(req,res)=>{res.send({title:'UPDATE user'})});
userRouter.delete('/:id',(req,res)=>{res.send({title:'DELETE a User'})});

export default userRouter;
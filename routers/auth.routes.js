import {Router} from 'express';
import {signUp,signIn,signOut} from '../controllers/auth.controller.js';
const authRouter = Router();
authRouter.post('/sign-up',signUp);//signUp is a function
authRouter.post('/sign-in',signIn);
authRouter.post('/sign-out',signOut);

export default authRouter;
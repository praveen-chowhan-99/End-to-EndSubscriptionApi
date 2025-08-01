import {Router} from 'express';
import authorize from '../middleware/auth.middleware.js';
import { createSubscription, getUserSubscriptions,getallSubscriptions } from '../controllers/subscription.controller.js';
const subscriptionRouter = Router();

subscriptionRouter.get('/',authorize,getallSubscriptions);
subscriptionRouter.get('/:id',(req,res)=>{res.send({title: 'GET subscription Details'})});
subscriptionRouter.post('/',authorize,createSubscription);
subscriptionRouter.put('/:id',(req,res)=>{res.send({title: 'UPDATE subscription'})});
subscriptionRouter.delete('/:id',(req,res)=>{res.send({title: 'DELETE a subscription'})});
subscriptionRouter.get('/user/:id',authorize,getUserSubscriptions);
subscriptionRouter.get('/:id/cancel',(req,res)=>{res.send({title: 'CANCEL subscription'})});//cancel a subscription
subscriptionRouter.get('/upcoming-renewals',(req,res)=>{res.send({title: 'GET Upcoming renewals'})});//resume a cancelled subscription
export default subscriptionRouter;

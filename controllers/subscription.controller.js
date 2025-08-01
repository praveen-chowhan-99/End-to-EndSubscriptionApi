import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });

        // You need to define these variables properly before using trigger
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
              subscriptionId: subscription.id,
            },
            headers: {
              'content-type': 'application/json',
            },
            retries: 0,
          })
          

        res.status(201).json({
            success: true,
            message: 'Subscription created successfully',
            data: {subscription,workflowRunId}
        });
    } catch (error) {
        next(error);
    }
};

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to view this user\'s subscriptions',
            });
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            message: 'User subscriptions fetched successfully',
            data: subscriptions
        });
    } catch (e) {
        next(e);
    }
};

export const getallSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            message: 'All subscriptions fetched successfully',
            data: subscriptions
        });
    } catch (e) {
        next(e);
    }
};

import { Router } from 'express';
import {
  initiateSubscription,
  getUserActiveSubscription,
  getUserSubscriptionHistory,
} from '../controllers/subscription.controller';

const router = Router();

// Initiate new subscription
router.post('/', initiateSubscription);

// Get user's active subscription
router.get('/active/:userId', getUserActiveSubscription);

// Get user's subscription history
router.get('/history/:userId', getUserSubscriptionHistory);

export default router;

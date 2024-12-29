import { Router } from 'express';
import { initiateSubscription } from '../controllers/subscription.controller';

const router = Router();

// Initiate new subscription
router.post('/', initiateSubscription);

export default router;

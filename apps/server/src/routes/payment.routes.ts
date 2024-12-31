import { Router } from 'express';
import {
  getUserPayments,
  getPaymentById,
  getPaymentStats,
  getRecentPayments,
} from '../controllers/payment.controller';

const router = Router();

// Get all payments for a user
router.get('/user/:userId', getUserPayments);

// Get payment by ID
router.get('/:paymentId', getPaymentById);

// Get payment statistics
router.get('/stats/overview', getPaymentStats);

// Get recent payments
router.get('/recent/all', getRecentPayments);

export default router;

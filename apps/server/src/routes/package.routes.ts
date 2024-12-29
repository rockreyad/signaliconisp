import { Router } from 'express';
import {
  getAllPackages,
  getPackageById,
  getUserCurrentPackage,
  getUserPackageHistory,
  getPackageStats,
} from '../controllers/package.controller';

const router = Router();

// Get all packages
router.get('/', getAllPackages);

// Get package statistics
router.get('/stats', getPackageStats);

// Get single package
router.get('/:id', getPackageById);

// Get user's current package
router.get('/user/:userId/current', getUserCurrentPackage);

// Get user's package history
router.get('/user/:userId/history', getUserPackageHistory);

export default router;

import { Router } from 'express';
import {
  getUserByIdentifier,
  getAllUsers,
} from '../controllers/user.controller';

const router = Router();

// Get all users
router.get('/', getAllUsers);

// Get user by any unique identifier (id, email, phone, or username)
router.get('/:identifier', getUserByIdentifier);

export default router;

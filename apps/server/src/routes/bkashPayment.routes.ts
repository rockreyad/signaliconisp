import { Router } from 'express';
import {
  createPayment,
  bkashCallback,
} from '../controllers/bkashPayment.controller';
import { grantToken } from '../utils/grantToken';

const router = Router();

router.use(grantToken);

router.post('/create', createPayment);
router.get('/callback', bkashCallback);

export default router;

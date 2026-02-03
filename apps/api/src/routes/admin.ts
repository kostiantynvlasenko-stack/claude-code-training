import { Router } from 'express';
import { requireAuth } from '../middleware/auth';

export const adminRouter = Router();

adminRouter.get('/stats', requireAuth, (_req, res) => {
  // Missing role check for training
  res.json({ users: 42, revenue: 1234 });
});

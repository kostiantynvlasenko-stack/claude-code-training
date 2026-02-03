import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../db/queries';

export const authRouter = Router();

const JWT_SECRET = 'FAKE_SECRET_FOR_TRAINING_ONLY';

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
  res.json({ token });
});

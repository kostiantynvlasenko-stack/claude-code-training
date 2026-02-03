import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../db/connection';
import { findUserByEmail } from '../db/queries';

export const authRouter = Router();

// ISSUE: Hardcoded JWT secret
const JWT_SECRET = 'FAKE_SECRET_FOR_TRAINING_ONLY';

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET);
  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

authRouter.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  try {
    db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
    ).run(name, email, password);

    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

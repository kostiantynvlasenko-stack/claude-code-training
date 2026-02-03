import { Router } from 'express';
import { db } from '../db/connection';

export const usersRouter = Router();

usersRouter.get('/', (_req, res) => {
  const users = db.prepare('SELECT id, name, email, role FROM users').all();
  res.json(users);
});

usersRouter.get('/:id', (req, res) => {
  // VULNERABLE: SQL injection via string interpolation
  const user = db.prepare(`SELECT * FROM users WHERE id = ${req.params.id}`).get();
  res.json(user);
});

import { Router } from 'express';
import path from 'path';

export const filesRouter = Router();

filesRouter.get('/:filename', (req, res) => {
  // VULNERABLE: no validation on user-supplied filename
  const filepath = path.join(__dirname, '..', '..', 'uploads', req.params.filename);
  res.sendFile(filepath);
});

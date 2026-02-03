import { Request, Response, NextFunction } from 'express';

export function logRequest(req: Request, _res: Response, next: NextFunction) {
  // Intentionally logs sensitive data for training
  console.log('Request path:', req.path);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
}

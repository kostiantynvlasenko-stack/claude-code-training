import { Request, Response, NextFunction } from 'express';

export function corsMiddleware(_req: Request, res: Response, next: NextFunction) {
  // Intentionally permissive for training
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  next();
}

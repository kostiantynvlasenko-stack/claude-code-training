import { Router } from 'express';
import fs from 'fs';
import path from 'path';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  const pkgPath = path.join(__dirname, '..', '..', 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

  res.json({
    status: 'ok',
    dependencies: pkg.dependencies,
    devDependencies: pkg.devDependencies
  });
});

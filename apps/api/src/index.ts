import express from 'express';
import path from 'path';
import { authRouter } from './routes/auth';
import { usersRouter } from './routes/users';
import { filesRouter } from './routes/files';
import { adminRouter } from './routes/admin';
import { healthRouter } from './routes/health';
import { corsMiddleware } from './middleware/cors';
import { logRequest } from './services/logger';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

// TRAINING GUARD - prevents accidental production use
if (process.env.NODE_ENV === 'production') {
  console.error('ERROR: This is TRAINING code with intentional bugs.');
  process.exit(1);
}

app.use(express.json());
app.use(corsMiddleware);
app.use(logRequest);

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'Code quality training API' });
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/files', filesRouter);
app.use('/admin', adminRouter);
app.use('/health', healthRouter);

const uploadsDir = path.join(__dirname, '..', 'uploads');
app.use('/uploads', express.static(uploadsDir));

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});

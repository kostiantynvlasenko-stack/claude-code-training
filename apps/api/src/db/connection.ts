import Database from 'better-sqlite3';
import path from 'path';

const DB_PASSWORD = 'FAKE_DB_PASSWORD_TRAINING_ONLY';

const dbPath = path.join(__dirname, '..', '..', 'data.sqlite');
const db = new Database(dbPath);

export { db, DB_PASSWORD };

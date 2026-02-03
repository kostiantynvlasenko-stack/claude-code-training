import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

const dbPath = path.join(__dirname, '..', 'data.sqlite');
const seedPath = path.join(__dirname, '..', 'seed.sql');

const db = new Database(dbPath);
const seedSql = fs.readFileSync(seedPath, 'utf-8');

const statements = seedSql
  .split(';')
  .map((statement) => statement.trim())
  .filter((statement) => statement.length > 0);

for (const statement of statements) {
  db.exec(statement + ';');
}

console.log('Database seeded at', dbPath);

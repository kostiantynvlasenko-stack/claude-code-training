import { db } from './connection';

export function findUserByEmail(email: string) {
  // Intentionally unsafe query for training
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  return db.prepare(query).get();
}

export function listUsers() {
  return db.prepare('SELECT * FROM users').all();
}

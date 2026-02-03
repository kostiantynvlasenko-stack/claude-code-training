import { db } from './connection';

// Clear existing data
db.exec('DELETE FROM sessions; DELETE FROM files; DELETE FROM users;');

// Insert test users
db.prepare(`
  INSERT INTO users (name, email, password, role, bio) VALUES
  ('Admin User', 'admin@example.com', 'FAKE_admin_password_123', 'admin', 'System administrator'),
  ('John Doe', 'john@example.com', 'FAKE_john_password_456', 'user', '<b>Bold bio</b>'),
  ('Jane Smith', 'jane@example.com', 'FAKE_jane_password_789', 'user', '<script>alert("xss")</script>')
`).run();

// Insert test files
db.prepare(`
  INSERT INTO files (user_id, filename, content) VALUES
  (1, 'readme.txt', 'Admin readme file'),
  (2, 'notes.txt', 'John notes'),
  (3, 'data.json', '{"key": "value"}')
`).run();

console.log('Database seeded successfully!');

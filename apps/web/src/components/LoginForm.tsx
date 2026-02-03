import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// ISSUE #2 (HIGH): Logs password to console
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // VULNERABLE: Password exposed in console - anyone with DevTools can see it
    console.log('Login attempt:', { email, password });

    try {
      await login(email, password);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      // Also logs password on error - double exposure
      console.log('Login failed for:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

// Safe version should not log passwords:
// console.log('Login attempt:', { email }); // Only log email, never password

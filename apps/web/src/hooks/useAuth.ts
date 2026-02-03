import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  role: string;
}

// ISSUE #3 (MEDIUM): Token stored in localStorage without any protection
// localStorage is accessible to any JavaScript on the page (XSS attack vector)
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // VULNERABLE: Raw token stored in localStorage
    // Any XSS attack can steal this token
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        // Invalid JSON, clear storage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }

    const data = await res.json();

    // VULNERABLE: Storing sensitive token in localStorage
    // Should use httpOnly cookies instead
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user_data', JSON.stringify(data.user));

    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  return { user, loading, login, logout };
}

// Better approach: Use httpOnly cookies set by the server
// This prevents JavaScript access to the token entirely

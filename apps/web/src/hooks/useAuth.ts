import { useEffect, useState } from 'react';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth_token');
    if (stored) {
      setToken(stored);
    }
  }, []);

  function saveToken(nextToken: string) {
    localStorage.setItem('auth_token', nextToken);
    setToken(nextToken);
  }

  return { token, saveToken };
}

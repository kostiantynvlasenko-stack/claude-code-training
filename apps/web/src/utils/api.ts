const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const API_KEY = 'FAKE_API_KEY_DO_NOT_USE';

export async function apiGet(path: string) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'x-api-key': API_KEY
    }
  });
  return response.json();
}

export async function apiPost(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY
    },
    body: JSON.stringify(body)
  });
  return response.json();
}

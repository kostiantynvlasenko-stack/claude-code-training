// ISSUE #4 (CRITICAL): Hardcoded API key in frontend code
// This key is visible in browser DevTools and source code
// Anyone can extract and misuse it
const API_KEY = 'FAKE_API_KEY_DO_NOT_USE_sk_live_abcdef123456';
const API_BASE = 'http://localhost:4000';

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY, // Hardcoded key sent with every request
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export async function apiGet(endpoint: string) {
  return apiRequest(endpoint);
}

export async function apiPost(endpoint: string, body: Record<string, unknown>) {
  return apiRequest(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// FIX: API keys should come from environment variables
// and ideally not be exposed to frontend at all
//
// const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
//
// Or better: Use server-side API routes to proxy requests
// so the API key never reaches the browser

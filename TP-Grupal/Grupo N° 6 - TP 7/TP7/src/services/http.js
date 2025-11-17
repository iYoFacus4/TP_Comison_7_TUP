// TP7/src/services/http.js
import { useAuthStore } from '../store/auth';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const API_URL = `${API_BASE}/api`;

export async function http(path, options = {}) {
  const { token } = useAuthStore.getState();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) {
    const err = contentType.includes('application/json')
      ? await res.json().catch(() => ({}))
      : await res.text();
    throw new Error(err.message || err || `HTTP ${res.status}`);
  }

  return contentType.includes('application/json') ? res.json() : res.text();
}

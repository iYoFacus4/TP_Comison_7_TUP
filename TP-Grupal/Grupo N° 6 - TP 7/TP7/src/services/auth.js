// TP7/src/services/auth.js
export const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function loginRequest({ email, password }) {
  const res = await fetch(`${apiBase}/api/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    // 401 u otro error
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Credenciales inválidas');
  }

  return res.json(); // { token, user: { id,email,rol } }
}

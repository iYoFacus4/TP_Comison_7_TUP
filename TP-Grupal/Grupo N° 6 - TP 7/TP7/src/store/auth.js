// TP7/src/store/auth.js
import { create } from 'zustand';
import { loginRequest } from '../services/auth';

export const useAuthStore = create((set, get) => ({
  token: null,
  user: null,
  error: null,
  loading: false,

  // Cargar sesión desde storage (opcional)
  hydrate: () => {
    const raw = localStorage.getItem('auth');
    if (!raw) return;
    try {
      const { token, user } = JSON.parse(raw);
      set({ token, user });
    } catch {}
  },

  loginAsync: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { token, user } = await loginRequest({ email, password });
      localStorage.setItem('auth', JSON.stringify({ token, user }));
      set({ token, user, loading: false });
      return true;
    } catch (e) {
      set({ error: e.message || 'Error de login', loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('auth');
    set({ token: null, user: null, error: null, loading: false });
  },
}));

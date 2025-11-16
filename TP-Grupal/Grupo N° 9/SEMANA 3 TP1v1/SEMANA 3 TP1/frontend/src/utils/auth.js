import { STORAGE_KEYS } from '../constants/storage';

export const loginFake = async (email, password) => {
  // login simulado: siempre OK
  const token = btoa(`${email}:${Date.now()}`);
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify({ token, email }));
  return { token, email };
};

export const logout = () => localStorage.removeItem(STORAGE_KEYS.AUTH);

export const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.AUTH));
  } catch {
    return null;
  }
};

export const isAuthenticated = () => Boolean(getSession()?.token);

import { STORAGE } from "../constants/storage";

export const getAuth  = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE.AUTH)); }
  catch { return null; }
};

export const setAuth  = (obj) => localStorage.setItem(STORAGE.AUTH, JSON.stringify(obj));
export const clearAuth= () => localStorage.removeItem(STORAGE.AUTH);

export const isLoggedIn = () => !!getAuth()?.token;
export const currentUser = () => getAuth();
export const hasRole = (role) => getAuth()?.role === role;
export const isAdmin   = () => getAuth()?.role === "admin";

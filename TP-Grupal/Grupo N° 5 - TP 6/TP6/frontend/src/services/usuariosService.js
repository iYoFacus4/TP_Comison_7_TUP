import { api } from './api';

export const getUsuarioPorEmail = async (email) => {
  if (!email) return null;
  const users = await api.get(`usuarios?email_like=${email.toLowerCase()}`);
  return users.length > 0 ? users[0] : null;
};
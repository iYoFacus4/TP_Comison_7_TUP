// src/services/usuariosService.js
import { http } from './http';

// POST /api/usuarios
export const createUsuario = async ({ email, password }) => {
  return http('/usuarios', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      rol: 'user'
    }),
  });
};

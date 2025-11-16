import { ENDPOINTS } from "./endpoints";
import { httpClient } from "./httpClient";
import { setAuth, clearAuth } from "../utils/auth";

/**
 * AuthService simple:
 * - login: busca por email en /users y compara password (texto plano)
 * - logout: limpia localStorage
 * - getProfile: devuelve datos guardados
 */
export const authService = {
  async login(email, password) {
    const client = httpClient();

    // Buscar usuario por email (json-server devuelve array)
    const list = await client.get(`${ENDPOINTS.users}?email=${encodeURIComponent(email)}`);
    const user = Array.isArray(list) ? list[0] : null;

    if (!user) {
      throw new Error("El usuario no existe");
    }
    if (user.password !== password) {
      throw new Error("Contraseña incorrecta");
    }

    // Guardar sesión mínima (token fake + perfil)
    const session = {
      token: "fake-token", // placeholder; sirve para proteger rutas
      user: user.email,
      name: user.name || user.email,
      role: user.role || "user",
      userId: user.id
    };
    setAuth(session);
    return session;
  },

  logout() {
    clearAuth();
  },
};

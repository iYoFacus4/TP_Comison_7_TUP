import { httpClient } from "./httpClient";

class AuthService {
  async login(credentials) {
    try {
      const response = await httpClient.post("/api/auth/login", credentials);

      if (response.ok && response.data.success) {
        this.setUserData(response.data.user);
        localStorage.setItem("isAuthenticated", "true");
        window.dispatchEvent(new Event("authChange"));

        return {
          success: true,
          user: response.data.user,
          message: response.data.message || "Login exitoso",
        };
      } else {
        return {
          success: false,
          error: response.error || "Error en login",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async register(userData) {
    try {
      const response = await httpClient.post("/api/auth/register", userData);

      if (response.ok && response.data.success) {
        this.setUserData(response.data.user);
        localStorage.setItem("isAuthenticated", "true");
        window.dispatchEvent(new Event("authChange"));

        return {
          success: true,
          user: response.data.user,
          message: response.data.message || "Registro exitoso",
        };
      } else {
        return {
          success: false,
          error: response.error || "Error en registro",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async logout() {
    try {
      const response = await httpClient.delete("/api/auth/logout");

      this.clearAuthData();
      window.dispatchEvent(new Event("authChange"));

      return {
        success: true,
        message: response.data?.message || "Sesión cerrada exitosamente",
      };
    } catch (error) {
      this.clearAuthData();
      window.dispatchEvent(new Event("authChange"));

      return {
        success: true,
        message: "Sesión cerrada exitosamente",
      };
    }
  }

  async verifySession() {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const user = this.getUserData();

    if (!isAuthenticated || !user) {
      return {
        isValid: false,
        user: null,
      };
    }

    return {
      isValid: true,
      user: user,
    };
  }

  async updateProfile(userData) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const currentUser = this.getUserData();

    if (!currentUser) {
      return {
        success: false,
        error: "No hay usuario autenticado",
      };
    }

    const updatedUser = {
      ...currentUser,
      ...userData,
      id: currentUser.id,
    };

    this.setUserData(updatedUser);

    return {
      success: true,
      user: updatedUser,
      message: "Perfil actualizado exitosamente",
    };
  }

  async changePassword(currentPassword, newPassword) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (!currentPassword || !newPassword) {
      return {
        success: false,
        error: "Ambas contraseñas son requeridas",
      };
    }

    if (newPassword.length < 6) {
      return {
        success: false,
        error: "La nueva contraseña debe tener al menos 6 caracteres",
      };
    }

    return {
      success: true,
      message: "Contraseña cambiada exitosamente",
    };
  }

  setUserData(user) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  getUserData() {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  clearAuthData() {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
  }

  isAuthenticated() {
    return (
      localStorage.getItem("isAuthenticated") === "true" && !!this.getUserData()
    );
  }
}

export const authService = new AuthService();
export default authService;

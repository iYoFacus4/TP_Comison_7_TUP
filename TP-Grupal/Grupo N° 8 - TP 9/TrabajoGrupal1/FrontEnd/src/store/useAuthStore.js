import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Usamos persist() para que el login se mantenga al recargar la página
// (es la forma correcta de hacer lo que hacía 'rememberMe')
export const useAuthStore = create(
  persist(
    (set) => ({
      // Estado
      user: null,
      isLoggedIn: false,

      // Acciones
      login: (userData) => {
        set({ user: userData, isLoggedIn: true });
      },
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'auth-storage', // Nombre de la clave en localStorage (Zustand lo maneja)
    }
  )
);
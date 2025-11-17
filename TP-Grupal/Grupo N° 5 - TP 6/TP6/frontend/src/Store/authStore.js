import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, 
      login: (usuario) => {
        console.log("Store: Guardando usuario", usuario);
        set({ user: usuario });
      },

      logout: () => {
        console.log("Store: Borrando usuario");
        set({ user: null });
      },
    }),
    {
      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
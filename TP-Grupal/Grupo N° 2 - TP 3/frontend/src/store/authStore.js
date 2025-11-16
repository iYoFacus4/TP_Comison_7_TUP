import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,

     
      login: (apiResponse) => {
        
        
        set({
          token: apiResponse.token,
          user: apiResponse.user 
        });
        
        console.log("Login exitoso. Usuario guardado:", apiResponse.user); 
      },

      logout: () => {
        set({ token: null, user: null });
        localStorage.removeItem('auth-storage'); 
      },

      isLogged: () => {
        return !!get().token;
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
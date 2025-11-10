import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


export const useAuthStore = create(
  persist(
    (set) => ({
     
      token: null, 
      user: null,  

      
      
      /**
     
       * @param {object} userData 
       */
      login: (userData) => set({
        token: userData.token,
        user: {
          username: userData.username,
          role: userData.role
        }
      }),

     
      logout: () => set({ 
        token: null, 
        user: null 
      }),

      /**
      
       * @returns {boolean}
       */
      isLogged: () => {
    
        const state = useAuthStore.getState();
        
        return !!state.token;
      }
    }),
    {

      name: 'auth-storage', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
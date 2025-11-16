import {create} from 'zustand';

export const useAuthStore = create((set)=>({
    user: null,
    pass:null,
    fecha:null,
    setUser : (user) => set({user}), 
   logout : () => set({user: null, pass: null, fecha: null}),

}))


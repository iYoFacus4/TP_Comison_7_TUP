import {login} from '../services/authService.js';
import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {ADMIN} from '../routers/HomePage.routes.js';
import { useAuthStore } from '../store/zunstand.js';

export const useAuth = () => {
     const setUser = useAuthStore((state) => state.setUser);//zustand
    // Recuperar usuario del localStorage al iniciar
    const [userr, setUserr] = useState(() => {
           const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const res = await login(credentials);
            const userData = res.find(item => item.email === credentials.email && 
                item.password === credentials.password);

           if(!userData){
            throw new Error("Credenciales invalidas");
           }

            // Guardar usuario en el estado y localStorage
            setUserr(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);

            navigate(ADMIN);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return { userr, error, handleLogin, handleLogout };
};
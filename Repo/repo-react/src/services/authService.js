import datos from '../services/api.js';
import {USUARIOS_URL} from '../endpoints/auth.js';

export const login = async () => {
    const response =  await datos.get(USUARIOS_URL);
    return response.data;
}
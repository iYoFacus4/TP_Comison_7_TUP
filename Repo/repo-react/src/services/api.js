import axios from 'axios';// libreria para hacer peticiones http
import {API} from '../endpoints/api';

// crear una instancia de axios con la URL base de la API
const datos = axios.create({
    baseURL: API
});

export default datos;

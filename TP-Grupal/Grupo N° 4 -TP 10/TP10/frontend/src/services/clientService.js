/**
 * ============================================================================
 * SERVICIO DE CLIENTES - INTEGRACIÓN CON BACKEND (TAREA 5)
 * ============================================================================
 * Este servicio maneja todas las operaciones CRUD de clientes.
 * 
 * CAMBIOS PRINCIPALES respecto a la versión anterior:
 * 
 * ANTES (con fetch y json-server):
 * - fetch(`${API_URL}${CLIENTS_API}`)
 * - Validación manual de response.ok
 * - JSON.stringify manual en POST/PUT
 * - Sin autenticación (no enviaba tokens)
 * 
 * AHORA (con apiClient y backend real):
 * - apiClient.get/post/put/delete (más limpio)
 * - JWT automático en headers (gracias al interceptor)
 * - response.data.data (estructura del backend: {ok, data})
 * - Validaciones en el backend (email único, etc.)
 * 
 * NOTA IMPORTANTE:
 * apiClient ya tiene configurado:
 * - baseURL: http://localhost:3001/api
 * - Authorization: Bearer <token> (interceptor)
 * - Content-Type: application/json
 * 
 * Por eso NO necesitamos agregar headers manualmente aquí.
 * ============================================================================
 */

import apiClient from './apiConfig'; // Cliente axios con JWT
import  {CLIENTS_API} from '../endpoints/apiEndoints'; // '/clients'

/**
 * getClients: Obtiene todos los clientes de la base de datos
 * @returns {Promise<Array>} Array de clientes
 */
export const getClients = async () => {
  try {
    // GET /api/clients
    const response = await apiClient.get(CLIENTS_API);
    
    // El backend devuelve: {ok: true, data: [...clientes], total: X}
    // Extraemos solo el array de clientes
    return response.data.data;
  } catch (error) {
    console.error('Error en getClients:', error);
    throw error; 
  }
};

/**
 * addClient: Crea un nuevo cliente en la base de datos
 * @param {Object} newClient - Datos del cliente {name, email, phone}
 * @returns {Promise<Object>} Cliente creado con su ID
 */
export const addClient = async (newClient) => {
  try {
    // POST /api/clients
    // El backend valida: email único, formato válido, campos obligatorios
    const response = await apiClient.post(CLIENTS_API, newClient);
    
    // Backend devuelve: {ok: true, data: {id, name, email, phone}}
    return response.data.data;
  } catch (error) {
    console.error('Error en addClient:', error);
    throw error;
  }
};

/**
 * deleteClient: Elimina un cliente de la base de datos
 * @param {Number} id - ID del cliente a eliminar
 * @returns {Promise<Boolean>} true si se eliminó correctamente
 */
export const deleteClient = async (id) => {
  try {
    // DELETE /api/clients/:id
    // El backend verifica que no tenga citas asociadas antes de eliminar
    await apiClient.delete(`${CLIENTS_API}/${id}`);
    
    return true; 
  } catch (error) {
    console.error('Error en deleteClient:', error);
    throw error;
  }
};

/**
 * updateClient: Actualiza los datos de un cliente existente
 * @param {Number} id - ID del cliente a actualizar
 * @param {Object} updatedClient - Nuevos datos {name, email, phone}
 * @returns {Promise<Object>} Cliente actualizado
 */
export const updateClient = async (id, updatedClient) => {
  try {
    // PUT /api/clients/:id
    // El backend valida: email único (excepto el propio), formato válido
    const response = await apiClient.put(`${CLIENTS_API}/${id}`, updatedClient);
    
    // Backend devuelve: {ok: true, data: {id, name, email, phone}}
    return response.data.data;
  } catch (error) {
    console.error('Error en updateClient:', error);
    throw error;
  }
};
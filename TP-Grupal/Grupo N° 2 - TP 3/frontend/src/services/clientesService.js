import api from './api'; 


export const getClientes = async () => {
  const res = await api.get('/clients');
  return res.data;
};


export const addCliente = async (nuevoCliente) => {
  const res = await api.post('/clients', nuevoCliente);
  return res.data;
};


export const updateCliente = async (id, clienteActualizado) => {
  const res = await api.put(`/clients/${id}`, clienteActualizado);
  return res.data;
};


export const deleteCliente = async (id) => {
  await api.delete(`/clients/${id}`);
};
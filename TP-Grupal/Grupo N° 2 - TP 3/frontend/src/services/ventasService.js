import api from './api'; 

export const getVentas = async () => {
  const res = await api.get('/sales');
  return res.data;
};

export const addVenta = async (nuevaVenta) => {
 
  const res = await api.post('/sales', nuevaVenta);
  return res.data;
};

export const deleteVenta = async (id) => {
  await api.delete(`/sales/${id}`);
};
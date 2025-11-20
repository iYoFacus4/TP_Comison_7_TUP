import api from './api';


export const getProductos = async () => {
  const res = await api.get('/products');
  return res.data;
};


export const getProducto = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};


export const addProducto = async (nuevoProducto) => {

  const res = await api.post('/products', nuevoProducto);
  return res.data;
};


export const deleteProducto = async (id) => {
  await api.delete(`/products/${id}`);
};


export const updateProducto = async (id, productoActualizado) => {
  const res = await api.put(`/products/${id}`, productoActualizado);
  return res.data; 
};
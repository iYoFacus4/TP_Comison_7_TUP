import api from './api';




export const getProductos = () => api.get('/products');

export const getProducto = (id) => api.get(`/products/${id}`);


export const addProducto = (nuevoProducto) => {

  return api.post('/products', nuevoProducto);
};


export const deleteProducto = (id) => api.delete(`/products/${id}`);


export const updateProducto = (id, productoActualizado) => {
  return api.put(`/products/${id}`, productoActualizado);
};
const API_URL = "http://localhost:5000/clientes";

// Obtener todos los clientes
export const getClientes = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// Agregar un nuevo cliente
export const addCliente = async (nuevoCliente) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoCliente),
  });
  return await res.json();
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

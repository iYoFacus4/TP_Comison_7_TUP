const API_URL = "http://localhost:5000/clientes";


export const getClientes = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};


export const addCliente = async (nuevoCliente) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevoCliente),
  });
  return await res.json();
};


export const deleteCliente = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

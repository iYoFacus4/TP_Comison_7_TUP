const API_URL = "http://localhost:5000/ventas";

// Obtener todas las ventas
export const getVentas = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

// Registrar una nueva venta
export const addVenta = async (nuevaVenta) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaVenta),
  });
  return await res.json();
};

// Eliminar venta
export const deleteVenta = async (id) => {
  await fetch(`http://localhost:5000/ventas/${id}`, { method: "DELETE" });
};

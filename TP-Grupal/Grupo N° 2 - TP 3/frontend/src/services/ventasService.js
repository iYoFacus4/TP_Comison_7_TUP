const API_URL = "http://localhost:5000/ventas";


export const getVentas = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};


export const addVenta = async (nuevaVenta) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevaVenta),
  });
  return await res.json();
};


export const deleteVenta = async (id) => {
  await fetch(`http://localhost:5000/ventas/${id}`, { method: "DELETE" });
};

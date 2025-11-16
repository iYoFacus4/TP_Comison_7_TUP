const API_URL = "http://localhost:5000/productos";

// Obtener todos los productos
export const getProductos = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const addProducto = async (nuevoProducto) => {
  try {
    const res = await fetch(API_URL);
    const productos = await res.json();

    // proximo id
    const nextId =
      productos.length > 0
        ? Math.max(...productos.map((p) => Number(p.id) || 0)) + 1
        : 1;

      //este hace que la id numerica sea fija
    const productoConId = { id: nextId, ...nuevoProducto };

    const postRes = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoConId),
    });

    if (!postRes.ok) throw new Error("Error al agregar producto");
    return await postRes.json();
  } catch (error) {
    console.error("❌ Error en addProducto:", error);
    throw error;
  }
};
// Eliminar producto
export const deleteProducto = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

// Editar producto
export const updateProducto = async (id, productoActualizado) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productoActualizado),
  });
  return await res.json();
};

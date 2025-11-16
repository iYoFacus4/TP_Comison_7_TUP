

// 🧁 Productos simulados
export const fakeProducts = [
  { id: 1, nombre: "Remera boxy fit", categoria: "Remeras", precio: 25000, stock: 12 },
  { id: 2, nombre: "Jeans Mom", categoria: "Jeans", precio: 55000, stock: 8 },
  { id: 3, nombre: "Vestido negro", categoria: "Ropa Formal", precio: 35000, stock: 12 },
];

// 👥 Clientes simulados
export const fakeClients = [
  { id: 1, nombre: "Juan Pérez", email: "juanp@example.com", telefono: "381-4567890" },
  { id: 2, nombre: "Ana López", email: "ana@example.com", telefono: "381-7891234" },
  { id: 3, nombre: "Exequiel Rodriguez", email: "r@example.com", telefono: "381-6549870" },
];

// 💸 Ventas simuladas
export const fakeSales = [
  { id: 1, cliente: "Juan Pérez", producto: "Remera boxy fit", cantidad: 2, total: 25000, fecha: "2025-10-25" },
  { id: 2, cliente: "Ana López", producto: "Vestido negro", cantidad: 1, total: 35000, fecha: "2025-10-25" },
  { id: 3, cliente: "Exequiel Rodriguez", producto: "Jeans Mom", cantidad: 1, total: 55000, fecha: "2025-10-26" },
];

// 💼 Usuarios del sistema
export const fakeUsers = [
  { id: 1, nombre: "Administrador", email: "admin@tienda.com", rol: "Admin" },
  { id: 2, nombre: "Vendedor1", email: "vendedor@tienda.com", rol: "Vendedor" },
];

// 📊 KPIs del Dashboard (datos simulados)
export const fakeDashboardData = {
  ventasHoy: 27,
  ingresosHoy: 152300,
  clientesActivos: 45,
  productosStockBajo: 8,
};

import { fakeProducts, fakeClients, fakeSales } from "./fakedata";

// ============================
// 🔁 Funciones simuladas (mock)
// ============================

// ✅ Simula un fetch de productos
export function fetchFakeProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeProducts), 500);
  });
}

// ✅ Simula un fetch de clientes
export function fetchFakeClients() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeClients), 600);
  });
}

// ✅ Simula un fetch de ventas
export function fetchFakeSales() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakeSales), 700);
  });
}

// ✅ Simula la creación de una venta
export function createFakeSale(newSale) {
  console.log("Venta simulada:", newSale);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, id: Math.floor(Math.random() * 1000) }), 400);
  });
}

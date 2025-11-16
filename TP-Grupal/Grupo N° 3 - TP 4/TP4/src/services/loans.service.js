// loans.service.js — list con paginación, create y return (devolución)
import { API_URL, ENDPOINTS } from "./endpoints";
import { httpClient } from "./httpClient";
import { audit } from "./audit.service";

// GET /loans?_page=1&_limit=10&_expand=book&_expand=student&studentId=...&bookId=...
export async function listLoans({ page = 1, limit = 10, studentId, bookId } = {}) {
  const params = new URLSearchParams();
  params.set("_page", page);
  params.set("_limit", limit);
  params.set("_expand", "book");
  params.append("_expand", "student");
  if (studentId) params.set("alumnoId", studentId);
  if (bookId) params.set("libroId", bookId);

  const res = await fetch(`${API_URL}${ENDPOINTS.loans}?${params.toString()}`);
  const total = Number(res.headers.get("X-Total-Count") || "0");
  const rows = await res.json();
  return { rows, total };
}

export async function createLoan(payload) {
  const client = httpClient();

  // ⚠️ Validación simple de stock si el libro tiene cantidadDisponible
  try {
    const book = await client.get(`${ENDPOINTS.books}/${payload.libroId}`);
    if (book && typeof book.cantidadDisponible === "number") {
      if (book.cantidadDisponible <= 0) {
        throw new Error("No hay ejemplares disponibles");
      }
      await client.patch(`${ENDPOINTS.books}/${book.id}`, {
        cantidadDisponible: book.cantidadDisponible - 1,
      });
    }
  } catch {
    // si no existe cantidadDisponible, continuamos sin bloquear
  }

  const created = await client.post(ENDPOINTS.loans, payload);
  await audit("CREATE", "loans", created.id);
  return created;
}

export async function returnLoan(id) {
  const client = httpClient();
  // 1) Obtener préstamo
  const loan = await client.get(`${ENDPOINTS.loans}/${id}`);

  // 2) Marcar devuelto y grabar fecha real devolución
  const fechaRealDevolucion = new Date().toISOString().slice(0,10); // YYYY-MM-DD
  await client.patch(`${ENDPOINTS.loans}/${id}`, {
    devuelto: true,
    fechaRealDevolucion
  });
  await audit("RETURN", "loans", id);

  // 3) Sumar stock si corresponde
  if (loan?.libroId) {
    try {
      const book = await client.get(`${ENDPOINTS.books}/${loan.libroId}`);
      if (book && typeof book.cantidadDisponible === "number") {
        await client.patch(`${ENDPOINTS.books}/${book.id}`, {
          cantidadDisponible: (book.cantidadDisponible ?? 0) + 1,
        });
      }
    } catch {}
  }
  return true;
}

export const loansService = {
  // alias “cómodos”
  list: listLoans,
  create: createLoan,
  return: returnLoan,

}
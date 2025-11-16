import { ENDPOINTS } from "./endpoints";
import { httpClient } from "./httpClient";
import { audit } from "./audit.service";

const client = httpClient();

export const booksService = {
  async getAll() {
    return await client.get(ENDPOINTS.books);
  },
  async create(data) {
    const res = await client.post(ENDPOINTS.books, data);
    await audit("CREATE", "books", res.id);
    return res;
  },
  async update(id, data) {
    const res = await client.patch(`${ENDPOINTS.books}/${id}`, data);
    await audit("UPDATE", "books", id);
    return res;
  },
  async delete(id) {
    const res = await client.delete(`${ENDPOINTS.books}/${id}`);
    await audit("DELETE", "books", id);
    return res;
  },
};

export async function searchBooks(query, limit = 50) {
  const client = httpClient();
  // json-server: q busca en todos los campos (título/autor/categoría, etc.)
  return client.get(`${ENDPOINTS.books}?q=${encodeURIComponent(query)}&_limit=${limit}`);
}

import { ENDPOINTS } from "./endpoints";
import { httpClient } from "./httpClient";
import { audit } from "./audit.service";

const client = httpClient();

export const studentsService = {
  async getAll() {
    return await client.get(ENDPOINTS.students);
  },
  async create(data) {
    const res = await client.post(ENDPOINTS.students, data);
    await audit("CREATE", "students", res.id);
    return res;
  },
  async update(id, data) {
    const res = await client.patch(`${ENDPOINTS.students}/${id}`, data);
    await audit("UPDATE", "students", id);
    return res;
  },
  async delete(id) {
    const res = await client.delete(`${ENDPOINTS.students}/${id}`);
    await audit("DELETE", "students", id);
    return res;
  },
};


export async function searchStudents(query, limit = 50) {
  const client = httpClient();
  return client.get(`${ENDPOINTS.students}?q=${encodeURIComponent(query)}&_limit=${limit}`);
}

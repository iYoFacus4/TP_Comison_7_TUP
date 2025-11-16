import { ENDPOINTS } from "./endpoints";
import { httpClient } from "./httpClient";
import { getAuth } from "../utils/auth";

/** Registra acciones para futura auditoría */
export async function audit(action, entity, entityId) {
  const client = httpClient();
  const actor = getAuth()?.user || "anon";
  const payload = {
    actor,
    accion: action,
    entity,
    entityId,
    timestamp: new Date().toISOString(),
  };
  return client.post(ENDPOINTS.audit, payload);
}

export async function getAudit() {
  const client = httpClient();
  // Ordenamos por timestamp descendente si json-server tiene _sort/_order
  try {
    return await client.get(`${ENDPOINTS.audit}?_sort=timestamp&_order=desc`);
  } catch {
    return await client.get(ENDPOINTS.audit);
  }
}
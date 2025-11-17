import { http } from './http';

// historial del socio
export const getReservasBySocio = async (socioId) => {
  return http(`/reservas?socio_id=${socioId}`);
};

// crear reserva
export const createReserva = async (data) => {
  return http('/reservas', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

// cancelar (soft delete)
export const cancelarReserva = async (id) => {
  return http(`/reservas/${id}`, {
    method: 'DELETE'
  });
};

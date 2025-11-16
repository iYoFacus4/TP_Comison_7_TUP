import API_URL from "./apiConfig"; 


export const getAllAppointments = async () => {
  const respuesta = await fetch(`${API_URL}/appointments`);
  if (!respuesta.ok) throw new Error("Error al cargar los turnos.");
  return respuesta.json();
};

export const createAppointment = async (appointmentData) => {
  const respuesta = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  if (!respuesta.ok) throw new Error("Error al crear el turno.");
  return respuesta.json();
};

export const deleteAppointment = async (id) => {
  const respuesta = await fetch(`${API_URL}/appointments/${id}`, {
    method: "DELETE",
  });
  if (!respuesta.ok) throw new Error("Error al eliminar el turno.");
  return true;
};


export const updateAppointment = async (id, appointmentData) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PUT", 
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  if (!response.ok) throw new Error("Error al actualizar el turno.");
  return response.json();
};





export const getAllClients = async () => {
  const respuesta = await fetch(`${API_URL}/clients`);
  if (!respuesta.ok) throw new Error("Error al cargar los clientes.");
  return respuesta.json();
};

export const getAllServices = async () => {
  const respuesta = await fetch(`${API_URL}/services`);
  if (!respuesta.ok) throw new Error("Error al cargar los servicios.");
  return respuesta.json();
};
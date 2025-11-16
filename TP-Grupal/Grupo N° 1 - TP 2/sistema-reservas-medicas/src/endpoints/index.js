// Configuración de endpoints para futuras integraciones con backend
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const ENDPOINTS = {
  // Autenticación
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",

  // Turnos
  TURNOS: "/turnos",
  TURNOS_BY_DATE: "/turnos/fecha",
  TURNOS_BY_PACIENTE: "/turnos/paciente",

  // Pacientes
  PACIENTES: "/pacientes",
  PACIENTE_BY_ID: "/pacientes/:id",

  // Médicos
  MEDICOS: "/medicos",
  MEDICO_BY_ID: "/medicos/:id",
  MEDICOS_BY_ESPECIALIDAD: "/medicos/especialidad",

  // Especialidades
  ESPECIALIDADES: "/especialidades",

  // Reportes
  REPORTES_TURNOS: "/reportes/turnos",
  REPORTES_MEDICOS: "/reportes/medicos",
};

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// Utilidades generales del sistema
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-AR');
};

export const formatTime = (time) => {
  return time.substring(0, 5); // HH:MM
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateTimeSlot = (horaInicio, horaFin) => {
  const inicio = new Date(`2000-01-01 ${horaInicio}`);
  const fin = new Date(`2000-01-01 ${horaFin}`);
  return fin > inicio;
};

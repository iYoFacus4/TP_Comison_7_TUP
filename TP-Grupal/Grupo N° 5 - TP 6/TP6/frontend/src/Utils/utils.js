export const formatISODate = (isoString) => {
  if (!isoString) return 'N/A';
  try {
    const fechaObj = new Date(isoString);
    const dia = fechaObj.getUTCDate().toString().padStart(2, '0');
    const mes = (fechaObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = fechaObj.getUTCFullYear();
    return `${dia}/${mes}/${anio}`;
  } catch (error) {
    return 'Fecha inválida';
  }
};
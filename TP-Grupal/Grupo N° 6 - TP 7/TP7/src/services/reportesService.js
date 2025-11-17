import { http } from './http';

// Calcula métricas a partir de socios reales (sin json-server)
export const getDataCards = async () => {
  const socios = await http('/socios');
  const totalSocios = socios.length;
  const sociosActivos = socios.filter(s => s.status === 'Activo').length;
  const sociosInactivos = totalSocios - sociosActivos;
  return { totalSocios, sociosActivos, sociosInactivos };
};

// Reporte extendido para ReportesPage
export const getReportes = async () => {
  const socios = await http('/socios');
  const total = socios.length;
  const basico = socios.filter(s => s.plan === 'Básico').length;
  const full = socios.filter(s => s.plan === 'Full').length;
  const activos = socios.filter(s => s.status === 'Activo').length;
  const inactivos = total - activos;

  return {
    nuevosEsteMes: 0,  // si no hay endpoint, lo dejamos 0
    bajasEsteMes: 0,   // idem
    distribucionPlanes: { basico, full },
    distribucionEstados: { activos, inactivos },
  };
};

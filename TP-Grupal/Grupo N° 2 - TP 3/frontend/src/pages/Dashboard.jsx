import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import ActionCard from "../dashboard/actioncard";
import KpiCard from "../dashboard/kpicard";
import { fakeDashboardData } from "../utils";

const PageContainer = styled.div`display:flex;`;

const QuickActionsGrid = styled.div`
  display:grid; 
  grid-template-columns:repeat(auto-fit, minmax(280px,1fr)); 
  gap:25px;
`;
const KpiGrid = styled.div`
  display:grid; 
  grid-template-columns:repeat(auto-fit, minmax(260px,1fr)); 
  gap:20px; 
  margin-bottom:25px;
`;

export function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setKpis(fakeDashboardData);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageContainer>
      <Sidebar />
      <MainContent title="Dashboard" description="Resumen de indicadores del día.">
        {loading && <p>Cargando KPIs...</p>}
        {!loading && kpis && (
          <>
            <KpiGrid>
              <KpiCard icon="cart"    title="Ventas (hoy)"     value={kpis.ventasHoy}       comparison="+8% vs ayer" />
              <KpiCard icon="dollar"  title="Ingresos (hoy)"   value={`$ ${kpis.ingresosHoy.toLocaleString('es-AR')}`} comparison="+5% vs ayer" />
              <KpiCard icon="ticket"  title="Ticket Promedio"  value={`$ ${kpis.ticketsPromedio ? kpis.ticketsPromedio.toLocaleString('es-AR') : 'N/A'}`} comparison="+2% vs ayer" />
              <KpiCard icon="truck"   title="Pend. de Entrega" value={kpis.pendientesEntrega ?? 0} comparison="-1 vs ayer" />
            </KpiGrid>

            <QuickActionsGrid>
              <ActionCard to="/ventas"    icon="shopping-cart" title="Nueva Venta" description="Crea una venta rápida." />
              <ActionCard to="/productos" icon="boxes"         title="Productos"   description="Gestiona el inventario." />
              <ActionCard to="/clientes"  icon="users"         title="Clientes"    description="Administra tus clientes." />
              <ActionCard to="/reportes"  icon="chart-pie"     title="Reportes"    description="Analiza rendimiento." />
            </QuickActionsGrid>
          </>
        )}
      </MainContent>
    </PageContainer>
  );
}

export default Dashboard;

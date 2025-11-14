import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import ActionCard from "../dashboard/actioncard";
import KpiCard from "../dashboard/kpicard";
import { getVentas } from "../services/ventasService";
import { getClientes } from "../services/clientesService";

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

  const [kpis, setKpis] = useState({
    ventasHoy: 0,
    ingresosHoy: 0,
    ticketsPromedio: 0,
    totalClientes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatosReales = async () => {
      setLoading(true);
      try {
       
        const [ventasData, clientesData] = await Promise.all([
          getVentas(),
          getClientes()
        ]);

       
        const hoy = new Date().toISOString().split('T')[0];

     
        const ventasDeHoy = ventasData.filter(v => {
          
            const fechaVenta = v.fecha || v.sale_date; 
            return fechaVenta && fechaVenta.toString().startsWith(hoy);
        });

        const totalIngresosHoy = ventasDeHoy.reduce((acc, v) => acc + Number(v.total), 0);

       
        const totalHistorico = ventasData.reduce((acc, v) => acc + Number(v.total), 0);
        const promedio = ventasData.length > 0 ? totalHistorico / ventasData.length : 0;

       
        setKpis({
          ventasHoy: ventasDeHoy.length,
          ingresosHoy: totalIngresosHoy,
          ticketsPromedio: promedio,
          totalClientes: clientesData.length
        });

      } catch (error) {
        console.error("Error cargando dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosReales();
  }, []);

  return (
    <PageContainer>
      <Sidebar />
      <MainContent title="Dashboard" description="Resumen de indicadores del día (Datos en Tiempo Real).">
        {loading && <p style={{padding: "20px"}}>Cargando indicadores...</p>}
        
        {!loading && (
          <>
            <KpiGrid>
              <KpiCard 
                icon="cart" 
                title="Ventas (hoy)" 
                value={kpis.ventasHoy} 
                comparison="Registradas hoy" 
              />
              <KpiCard 
                icon="dollar" 
                title="Ingresos (hoy)" 
                value={`$ ${kpis.ingresosHoy.toLocaleString('es-AR')}`} 
                comparison="Facturación diaria" 
              />
              <KpiCard 
                icon="ticket" 
                title="Ticket Promedio" 
                value={`$ ${kpis.ticketsPromedio.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`} 
                comparison="Histórico global" 
              />
             
              <KpiCard 
                icon="users" 
                title="Total Clientes" 
                value={kpis.totalClientes} 
                comparison="Base de datos activa" 
              />
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
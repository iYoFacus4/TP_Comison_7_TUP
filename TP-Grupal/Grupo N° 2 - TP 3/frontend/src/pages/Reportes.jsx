import React, { useState,useEffect,useMemo } from 'react';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css" 
import Sidebar from '../layout/sidebar';
import MainContent from '../layout/maincontent';
import { getVentas } from '../services/ventasService';
import { getProductos } from '../services/productosService';

const PageContainer = styled.div`
  display: flex;
`;

const KPIContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const SimpleCard = styled.div`
    padding: 20px;
    border-radius: 15px;
    background-color: var(--white, #fff);
    border: 1px solid var(--border-color, #e0e0e0);
    box-shadow: 0 2px 4px rgba(223, 52, 52, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

    &:hover {
    box-shadow: 0 10px 20px  rgba(0, 120, 218, 0.81);
    
    h3 {
        margin: 0;
        font-size: 1.5rem;
        color: var(--text-dark);
    }
    p {
        margin-top: 5px;
        font-size: 0.85rem;
        color: var(--text-light);
    }
`;

const FiltersBar = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid var(--border-color, #000000ff);
  border-radius: 15px;
  background-color: var(--light-bg, #317ac4ff);
`;

const StyledSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid var(--border-color, #e0e0e0);
  border-radius: 12px;
  background-color: var(--white, #fff);
  font-size: 0.9rem;
  min-width: 150px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue, #3b82f6);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-bottom: 40px;
  border-radius: 15px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;





const Reportes = () => {
  const [timeframe, setTimeframe] = useState('all'); 
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const [ventasData, productosData] = await Promise.all([
          getVentas(),
          getProductos()
        ]);
        setVentas(ventasData);
        setProductos(productosData);
      } catch (error) {
        console.error("Error cargando reportes:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

 
  const kpis = useMemo(() => {
    const totalVentas = ventas.reduce((sum, v) => sum + Number(v.total), 0);
    const cantidadVentas = ventas.length;
    const ticketPromedio = cantidadVentas > 0 ? totalVentas / cantidadVentas : 0;
    
   
    const stockCriticoCount = productos.filter(p => p.stock <= 5).length;

    return [
      { title: 'Ventas Totales', value: `$${totalVentas.toLocaleString()}`, trend: 'Acumulado histórico' },
      { title: 'Ticket Promedio', value: `$${ticketPromedio.toLocaleString()}`, trend: 'Por transacción' },
      { title: 'Transacciones', value: cantidadVentas, trend: 'Total registradas' },
      { title: 'Stock Crítico', value: stockCriticoCount, trend: 'Items con stock bajo (<= 5)' },
    ];
  }, [ventas, productos]);

  const productosCriticos = productos.filter(p => p.stock <= 5);

  const StockCriticoTable = () => (
    <div className="hoverStockBox" style={{
      backgroundColor: "var(--white)",
      padding: "20px",
      borderRadius: "10px",
      border: "1px solid var(--border-color)",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
    }}>
      <h3 style={{ marginTop: 0 }}>Productos con Stock Bajo</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>Producto</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Precio</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Stock Actual</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Umbral</th>
          </tr>
        </thead>
        <tbody>
          {productosCriticos.length === 0 ? (
            <tr><td colSpan="4" style={{padding: "20px", textAlign: "center"}}>¡Todo bien! No hay productos con stock bajo.</td></tr>
          ) : (
            productosCriticos.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px dotted var(--border-color)" }}>
                <td style={{ padding: "10px" }}>{p.name}</td>
                <td style={{ padding: "10px", textAlign: "right" }}>${p.price}</td>
                <td style={{ padding: "10px", textAlign: "right", fontWeight: "bold", color: "red" }}>
                  {p.stock}
                </td>
                <td style={{ padding: "10px", textAlign: "right" }}>5</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <p style={{ padding: "20px" }}>Cargando reportes...</p>;

  return (
    <PageContainer>
      <Sidebar />
      <MainContent title="Reportes y Analíticas" description="Información clave para tomar decisiones.">
        <FiltersBar>
          <label style={{ fontWeight: "600" }}>Período:</label>
          <StyledSelect value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
            <option value="all">Histórico Completo</option>
            <option value="7d">Últimos 7 días (Simulado)</option>
          </StyledSelect>
        </FiltersBar>

        <h2>Indicadores Clave de Desempeño (KPIs)</h2>
        <KPIContainer>
          {kpis.map((kpi, index) => (
            <SimpleCard key={index}>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>{kpi.title}</p>
              <h3 style={{ margin: "5px 0" }}>{kpi.value}</h3>
              <p style={{ margin: 0, fontSize: "0.75rem", color: kpi.title === "Stock Crítico" ? "red" : "green" }}>
                {kpi.trend}
              </p>
            </SimpleCard>
          ))}
        </KPIContainer>

        <h2>Tendencia y Desempeño</h2>
        <ChartGrid>
          <div className="hoverChartBox" style={{
             height: "350px", backgroundColor: "#fff", padding: "20px", borderRadius: "15px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
          }}>
            <h3 style={{ marginTop: 0 }}>Evolución de Ventas</h3>
            <p style={{color: "#888"}}>(Gráfico disponible en próxima versión)</p>
          </div>

          <div className="hoverChartBox" style={{
             height: "350px", backgroundColor: "#fff", padding: "20px", borderRadius: "15px", border: "1px solid #e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"
          }}>
            <h3 style={{ marginTop: 0 }}>Top Productos</h3>
            <p style={{color: "#888"}}>(Gráfico disponible en próxima versión)</p>
          </div>
        </ChartGrid>

        <h2 style={{ marginTop: "20px" }}>Reportes Detallados</h2>
        <StockCriticoTable />
      </MainContent>
    </PageContainer>
  );
};
export default Reportes;
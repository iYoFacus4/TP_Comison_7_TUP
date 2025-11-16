import React, { useState } from 'react';
import styled from 'styled-components';
import "bootstrap/dist/css/bootstrap.min.css" //enlazada aqui pero se aplica en el proyecto completo
import Sidebar from '../layout/sidebar';
import MainContent from '../layout/maincontent';

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
  const [timeframe, setTimeframe] = useState('7d'); 

  const kpiData = [
    { title: 'Ventas Totales', value: '$12,450.00', trend: '+12% vs mes ant.' },
    { title: 'Ticket Promedio', value: '$45.50', trend: '-2% vs mes ant.' },
    { title: 'Productos Vendidos', value: '315', trend: '+5% vs mes ant.' },
    { title: 'Stock Crítico', value: '18', trend: 'Items en alerta' },
  ];

  const timeframeOptions = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 90 días' },
    { value: 'custom', label: 'Personalizado' },
  ];

const StockCriticoTable = () => (
  <>
    <style>
      {`
        .hoverStockBox {
          background-color: var(--white);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid var(--border-color);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .hoverStockBox:hover {
          box-shadow: 0 10px 20px rgba(0, 120, 218, 0.81);
          transform: translateY(-4px);
        }
      `}
    </style>

    <div className="hoverStockBox">
      <h3 style={{ marginTop: 0 }}>Productos con Stock Bajo</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "0.9rem",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>SKU</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Producto</th>
            <th style={{ padding: "10px", textAlign: "right" }}>
              Stock Actual
            </th>
            <th style={{ padding: "10px", textAlign: "right" }}>Umbral</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: "1px dotted var(--border-color)" }}>
            <td style={{ padding: "10px" }}>PANT-005</td>
            <td style={{ padding: "10px" }}>Pantalón Jean (32, Azul)</td>
            <td
              style={{
                padding: "10px",
                textAlign: "right",
                fontWeight: "bold",
                color: "red",
              }}
            >
              2
            </td>
            <td style={{ padding: "10px", textAlign: "right" }}>5</td>
          </tr>
          <tr style={{ borderBottom: "1px dotted var(--border-color)" }}>
            <td style={{ padding: "10px" }}>CAM-012</td>
            <td style={{ padding: "10px" }}>Camisa Lino (S, Blanco)</td>
            <td
              style={{
                padding: "10px",
                textAlign: "right",
                fontWeight: "bold",
                color: "red",
              }}
            >
              4
            </td>
            <td style={{ padding: "10px", textAlign: "right" }}>5</td>
          </tr>
          <tr>
            <td style={{ padding: "10px" }}>POLO-001</td>
            <td style={{ padding: "10px" }}>Remera Polo (L, Negro)</td>
            <td
              style={{
                padding: "10px",
                textAlign: "right",
                fontWeight: "bold",
                color: "orange",
              }}
            >
              6
            </td>
            <td style={{ padding: "10px", textAlign: "right" }}>8</td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);



  return (
    <PageContainer>
      <Sidebar />
      <MainContent
        title="Reportes y Analíticas"
        description="Información clave para tomar decisiones y gestionar el rendimiento."
      >
        <FiltersBar>
          <label htmlFor="timeframe-select" style={{ fontWeight: "600" }}>
            Período:
          </label>
          <StyledSelect
            id="timeframe-select"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            {timeframeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </StyledSelect>
        </FiltersBar>

        <h2>Indicadores Clave de Desempeño (KPIs)</h2>
        <KPIContainer>
          {kpiData.map((kpi, index) => (
            <SimpleCard key={index}>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  color: "var(--text-light)",
                }}
              >
                {kpi.title}
              </p>
              <h3 style={{ margin: "5px 0" }}>{kpi.value}</h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.75rem",
                  color: kpi.title === "Stock Crítico" ? "red" : "green",
                }}
              >
                {kpi.trend}
              </p>
            </SimpleCard>
          ))}
        </KPIContainer>

        <h2>Tendencia y Desempeño</h2>
        <>
          <style>
          {`
      .hoverChartBox {
        height: 350px;
        background-color: var(--white);
        padding: 20px;
        border-radius: 15px;
        border: 1px solid var(--border-color);
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
      }

      .hoverChartBox:hover {
        box-shadow: 0 10px 20px rgba(0, 120, 218, 0.81);
        transform: translateY(-4px);
      }
    `}
          </style>

          <ChartGrid>
            <div className="hoverChartBox">
              <h3 style={{ marginTop: 0 }}>
                Gráfico: Evolución de Ventas por Período
              </h3>
              <p>
                Aquí se integrará tu librería de gráficos (ej. Chart.js o
                Recharts).
              </p>
            </div>

            <div className="hoverChartBox">
              <h3 style={{ marginTop: 0 }}>
                Gráfico: Productos Más Vendidos (Top 5)
              </h3>
              <p>Visualización por unidades o por monto total.</p>
            </div>
          </ChartGrid>
        </>

        <h2 style={{ marginTop: "20px" }}>Reportes Detallados</h2>
        <StockCriticoTable />
      </MainContent>
    </PageContainer>
  );
};

export default Reportes;
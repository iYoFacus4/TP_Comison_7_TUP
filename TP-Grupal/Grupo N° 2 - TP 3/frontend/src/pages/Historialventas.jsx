import React, { useState, useMemo } from "react";
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import { useFetch } from "../hooks/useFetch"; // ✅ Hook personalizado
import { deleteVenta } from "../services/ventasService"; 

const PageContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  background-color: var(--white);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const SearchBar = styled.div`
  position: relative;
  width: 350px;
  i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
  }
  input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 0.9rem;
    &:focus {
      outline: none;
      border-color: var(--primary-blue);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
    }
  }
`;

const ExportButton = styled.button`
  background-color: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: var(--primary-blue-dark);
  }
`;

const ActionButton = styled.button`
  border: none;
  background-color: ${(props) =>
    props.variant === "delete" ? "#DC2626" : "var(--primary-blue)"};
  color: white;
  border-radius: 5px;
  padding: 5px 8px;
  margin: 0 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    opacity: 0.85;
  }
`;


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 25px;
  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  th {
    color: var(--text-light);
    font-weight: 600;
  }
`;

const HistorialVentas = () => {
  const { data: ventas, loading: loadingVentas, error: errorVentas,refetch, } = useFetch("http://localhost:5000/ventas");
  const { data: clientes, loading: loadingClientes, error: errorClientes } = useFetch("http://localhost:5000/clientes");
  const [filtro, setFiltro] = useState("");

  const ventasConCliente = useMemo(() => {
    if (!ventas || !clientes) return [];
    return ventas.map((v) => {
      const cliente = clientes.find((c) => c.id === v.clienteId);
      return {
        ...v,
        clienteNombre: cliente ? cliente.nombre : "Desconocido",
      };
    });
  }, [ventas, clientes]);

  const ventasFiltradas = ventasConCliente.filter((v) => {
  const nombreCliente = (v.clienteNombre || "").toString().trim().toLowerCase();
  const textoFiltro = filtro.trim().toLowerCase();

  return nombreCliente.includes(textoFiltro) || String(v.id).includes(filtro);
});
 
  const handleDeleteVenta = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta venta?")) return;
    try {
      await deleteVenta(id);
      alert("✅ Venta eliminada exitosamente");
      refetch(); // 🔄 recargar datos actualizados
    } catch (error) {
      console.error("Error al eliminar venta:", error);
      alert("Error al eliminar la venta.");
    }
  };

  const exportarCSV = () => {
    if (ventasConCliente.length === 0) {
      alert("No hay ventas para exportar.");
      return;
    }

    const encabezados = ["ID Venta", "Fecha", "Cliente", "Total"];

    const filas = ventasConCliente.map((v) => [
      v.id,
      v.fecha,
      v.clienteNombre,
      v.total,
    ]);

    const totalMonto = ventasConCliente.reduce((acc, v) => acc + Number(v.total || 0), 0);
    const totalVentas = ventasConCliente.length;
    const ticketPromedio = totalMonto / totalVentas;

    filas.push([]);
    filas.push(["", "", "Total de Ventas", totalVentas]);
    filas.push(["", "", "Monto Total Vendido", `$${totalMonto.toLocaleString()}`]);
    filas.push(["", "", "Ticket Promedio", `$${ticketPromedio.toFixed(2)}`]);

    const csvContent = [encabezados, ...filas].map((e) => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `reporte_ventas_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loadingVentas || loadingClientes) {
    return <p style={{ padding: "20px" }}>Cargando historial de ventas...</p>;
  }

  if (errorVentas || errorClientes) {
    return (
      <p style={{ padding: "20px", color: "red" }}>
        Error al cargar los datos del servidor.
      </p>
    );
  }

  return (
    <PageContainer>
      <Sidebar />
      <MainContent
        title="Historial de Ventas"
        description="Consulta, filtra y exporta todas las transacciones realizadas."
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <SearchBar>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar por ID o cliente..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </SearchBar>
          <ExportButton onClick={exportarCSV}>Exportar Reporte</ExportButton>
        </div>

        <ContentWrapper>
          <Table>
            <thead>
              <tr>
                <th>ID Venta</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Acciones</th> 
              </tr>
            </thead>
            <tbody>
              {ventasFiltradas.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
                    No hay ventas registradas aún.
                  </td>
                </tr>
              ) : (
                ventasFiltradas.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.fecha}</td>
                    <td>{v.clienteNombre}</td>
                    <td>${v.total}</td>
                    <td>
                      <ActionButton
                        variant="delete"
                        onClick={() => handleDeleteVenta(v.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </ActionButton>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </ContentWrapper>
      </MainContent>
    </PageContainer>
  );
};

export default HistorialVentas;

import React, { useState, useMemo,useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import { getVentas, deleteVenta } from "../services/ventasService";
import { getClientes } from "../services/clientesService";

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

  const [ventas, setVentas] = useState([]);
  const [clientes, setClientes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  // 3. Cargar datos al montar
  const cargarDatos = async () => {
    setLoading(true);
    try {
      // Ejecutamos las peticiones en paralelo
      const [ventasData, clientesData] = await Promise.all([
        getVentas(),
        getClientes()
      ]);
      
      setVentas(ventasData);
      setClientes(clientesData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar el historial.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  
  const ventasProcesadas = useMemo(() => {
    return ventas.map((v) => {
    
      let nombreCliente = v.clienteNombre; 
      if (!nombreCliente && clientes.length > 0) {
        const c = clientes.find(cli => cli.id === v.clientId);
        nombreCliente = c ? c.name : "Desconocido";
      }

      return {
        ...v,
        clienteNombre: nombreCliente || "Cliente Eliminado",
      
        fechaFormateada: new Date(v.sale_date || v.fecha).toLocaleDateString()
      };
    });
  }, [ventas, clientes]);

  // 5. Filtrado
  const ventasFiltradas = ventasProcesadas.filter((v) => {
    const nombreCliente = (v.clienteNombre || "").toString().trim().toLowerCase();
    const textoFiltro = filtro.trim().toLowerCase();
    return nombreCliente.includes(textoFiltro) || String(v.id).includes(filtro);
  });

  const handleDeleteVenta = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta venta?")) return;
    try {
      await deleteVenta(id);
     
      setVentas(ventas.filter(v => v.id !== id));
      alert("✅ Venta eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar venta:", error);
      alert("Error al eliminar la venta.");
    }
  };

  const exportarCSV = () => {
    if (ventasFiltradas.length === 0) {
      alert("No hay ventas para exportar.");
      return;
    }
    const encabezados = ["ID Venta", "Fecha", "Cliente", "Total"];
    const filas = ventasFiltradas.map((v) => [
      v.id,
      v.fechaFormateada,
      v.clienteNombre,
      v.total,
    ]);

    const totalMonto = ventasFiltradas.reduce((acc, v) => acc + Number(v.total || 0), 0);
    filas.push([]);
    filas.push(["", "", "Total:", `$${totalMonto.toLocaleString()}`]);

    const csvContent = [encabezados, ...filas].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `reporte_ventas.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p style={{ padding: "20px" }}>Cargando historial...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>{error}</p>;

  return (
   <PageContainer>
      <Sidebar />
      <MainContent title="Historial de Ventas" description="Consulta todas las transacciones.">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
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
                  <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                    No hay ventas registradas.
                  </td>
                </tr>
              ) : (
                ventasFiltradas.map((v) => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.fechaFormateada}</td>
                    <td>{v.clienteNombre}</td>
                    <td>${Number(v.total).toLocaleString()}</td>
                    <td>
                      <ActionButton variant="delete" onClick={() => handleDeleteVenta(v.id)}>
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

import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import { addVenta } from "../services/ventasService";
import { useFetch } from "../hooks/useFetch";

const PageContainer = styled.div`
  display: flex;
`;

const FormSection = styled.div`
  background-color: var(--white);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.variant === "secondary" ? "#3B82F6" : "#10B981"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const ProductosTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  td,
  th {
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
  }
`;

const Ventas = () => {
  const { data: clientes, loading: loadingClientes, error: errorClientes } = useFetch("http://localhost:5000/clientes");
  const { data: productos, loading: loadingProductos, error: errorProductos } = useFetch("http://localhost:5000/productos");

  // Estados locales
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [detalle, setDetalle] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  const handleAgregarProducto = () => {
    const producto = productos.find((p) => String(p.id) === productoSeleccionado);
    if (!producto) return;
    setDetalle([...detalle, producto]);
  };

  const handleEliminarProducto = (id) => {
    setDetalle(detalle.filter((p) => p.id !== id));
  };

  const handleFinalizarVenta = async () => {
    if (!clienteSeleccionado || detalle.length === 0) {
      alert("Debe seleccionar un cliente y al menos un producto");
      return;
    }

    const nuevaVenta = {
      clienteId: Number(clienteSeleccionado),
      fecha,
      productos: detalle.map((p) => ({
        productoId: p.id,
        nombre: p.nombre,
        precio: p.precio,
      })),
      total: detalle.reduce((sum, p) => sum + Number(p.precio), 0),
    };

    try {
      await addVenta(nuevaVenta);
      alert("✅ Venta registrada exitosamente");
      setClienteSeleccionado("");
      setProductoSeleccionado("");
      setDetalle([]);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("❌ Error al registrar la venta");
    }
  };

  // Mensajes de carga o error
  if (loadingClientes || loadingProductos) {
    return <p style={{ padding: "20px" }}>Cargando datos...</p>;
  }

  if (errorClientes || errorProductos) {
    return (
      <p style={{ padding: "20px", color: "red" }}>
        Error al cargar datos del servidor.
      </p>
    );
  }

  return (
    <PageContainer>
      <Sidebar />
      <MainContent
        title="Registrar Nueva Venta"
        description="Completa los detalles para procesar la transacción."
      >
        <FormSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label>Cliente</label>
              <Select
                value={clienteSeleccionado}
                onChange={(e) => setClienteSeleccionado(e.target.value)}
              >
                <option value="">Seleccione un cliente...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label>Fecha de Venta</label>
              <Input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
          </div>

          <h3 style={{ marginTop: "30px" }}>Detalle de Productos</h3>
          <Select
            value={productoSeleccionado}
            onChange={(e) => setProductoSeleccionado(e.target.value)}
          >
            <option value="">Seleccione un producto...</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} - ${p.precio}
              </option>
            ))}
          </Select>

          <Button
            variant="secondary"
            style={{ marginTop: "10px" }}
            onClick={handleAgregarProducto}
          >
            Agregar Producto
          </Button>

          {detalle.length > 0 && (
            <ProductosTable>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {detalle.map((p) => (
                  <tr key={p.id}>
                    <td>{p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>
                      <Button onClick={() => handleEliminarProducto(p.id)}>
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ProductosTable>
          )}

          <h4 style={{ marginTop: "15px" }}>
            Total: ${detalle.reduce((sum, p) => sum + Number(p.precio), 0)}
          </h4>

          <Button
            style={{ marginTop: "20px", backgroundColor: "var(--primary-blue)" }}
            onClick={handleFinalizarVenta}
          >
            Finalizar Venta
          </Button>
        </FormSection>
      </MainContent>
    </PageContainer>
  );
};

export default Ventas;

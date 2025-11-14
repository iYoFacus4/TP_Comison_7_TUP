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
    props.variant === "secondary" ? "#3B82F6" : props.variant === "danger" ? "#EF4444" : "#10B981"};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const QtyButton = styled.button`
  background-color: #e5e7eb;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  &:hover {
    background-color: #d1d5db;
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
    text-align: center; 
  }
  td:first-child, th:first-child {
    text-align: left; 
  }
`;

const Ventas = () => {
  const { data: clientes, loading: loadingClientes, error: errorClientes } = useFetch("http://localhost:3001/api/clients");
  const { data: productos, loading: loadingProductos, error: errorProductos } = useFetch("http://localhost:3001/api/products");

  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
  const [detalle, setDetalle] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");

  
  const handleAgregarProducto = () => {
    const producto = productos.find((p) => String(p.id) === productoSeleccionado);
    if (!producto) return;

 
    const existe = detalle.find((item) => item.id === producto.id);

    if (existe) {
      
      if (existe.cantidad + 1 > producto.stock) {
        alert(`No hay suficiente stock. Stock máximo: ${producto.stock}`);
        return;
      }
      
      setDetalle(detalle.map((item) => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ));
    } else {
     
      if (producto.stock <= 0) {
        alert("No hay stock disponible");
        return;
      }
      
      setDetalle([...detalle, { ...producto, cantidad: 1 }]);
    }
  };


  const handleCambiarCantidad = (id, delta) => {
    setDetalle(detalle.map(item => {
      if (item.id === id) {
        const nuevaCantidad = item.cantidad + delta;
     
        if (nuevaCantidad < 1) return item; 
        if (nuevaCantidad > item.stock) {
          alert(`Stock máximo alcanzado (${item.stock})`);
          return item;
        }
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }));
  };

  
  const handleEliminarProducto = (id) => {
    setDetalle(detalle.filter((p) => p.id !== id));
  };

 
  const handleFinalizarVenta = async () => {
    if (!clienteSeleccionado || detalle.length === 0) {
      alert("Debe seleccionar un cliente y al menos un producto");
      return;
    }

    const ventaPayload = {
      clientId: Number(clienteSeleccionado),
      
      productos: detalle.map((p) => ({
        productId: p.id,
        cantidad: p.cantidad, 
        precio: p.price
      }))
    };

    try {
      await addVenta(ventaPayload);
      alert("✅ Venta registrada exitosamente");
      
   
      setClienteSeleccionado("");
      setProductoSeleccionado("");
      setDetalle([]);
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      const msg = error.response?.data?.message || "Error al registrar la venta";
      alert("❌ " + msg);
    }
  };

  if (loadingClientes || loadingProductos) return <p style={{ padding: "20px" }}>Cargando datos...</p>;
  if (errorClientes || errorProductos) return <p style={{ padding: "20px", color: "red" }}>Error al cargar datos.</p>;

  // Cálculo del total general
  const totalVenta = detalle.reduce((sum, p) => sum + (Number(p.price) * p.cantidad), 0);

 return (
    <PageContainer>
      <Sidebar />
      <MainContent title="Registrar Nueva Venta" description="Completa los detalles para procesar la transacción.">
        <FormSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label>Cliente</label>
              <Select value={clienteSeleccionado} onChange={(e) => setClienteSeleccionado(e.target.value)}>
                <option value="">Seleccione un cliente...</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </Select>
            </div>
            <div>
              <label>Fecha de Venta</label>
              <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </div>
          </div>

          <h3 style={{ marginTop: "30px" }}>Detalle de Productos</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <Select value={productoSeleccionado} onChange={(e) => setProductoSeleccionado(e.target.value)}>
              <option value="">Seleccione un producto...</option>
              {productos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - ${p.price} (Stock: {p.stock})
                </option>
              ))}
            </Select>
            <Button variant="secondary" onClick={handleAgregarProducto}>Agregar</Button>
          </div>

          {detalle.length > 0 && (
            <ProductosTable>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio Unit.</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {detalle.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <QtyButton onClick={() => handleCambiarCantidad(p.id, -1)}>-</QtyButton>
                        <span>{p.cantidad}</span>
                        <QtyButton onClick={() => handleCambiarCantidad(p.id, 1)}>+</QtyButton>
                      </div>
                    </td>
                    <td>${(p.price * p.cantidad).toLocaleString()}</td>
                    <td>
                      <Button variant="danger" onClick={() => handleEliminarProducto(p.id)}>X</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ProductosTable>
          )}

          <h4 style={{ marginTop: "20px", textAlign: "right" }}>
            Total a Pagar: ${totalVenta.toLocaleString()}
          </h4>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
            <Button style={{ backgroundColor: "var(--primary-blue)", padding: "12px 24px", fontSize: "1rem" }} onClick={handleFinalizarVenta}>
              Finalizar Venta
            </Button>
          </div>
        </FormSection>
      </MainContent>
    </PageContainer>
  );
};

export default Ventas;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import DataTable from "../components/tables/datatable";
import { addCliente, deleteCliente } from "../services/clientesService";
import { useFetch } from "../hooks/useFetch";

const PageContainer = styled.div`
  display: flex;
`;

const PageActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
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

const PrimaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background-color: var(--primary-blue);
  color: var(--white);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: var(--primary-blue-dark);
  }
`;

const ContentWrapper = styled.div`
  background-color: var(--white);
  padding: 25px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const ActionButton = styled.button`
  border: none;
  background-color: ${(props) =>
    props.variant === "edit" ? "var(--primary-blue)" : "#DC2626"};
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

const Clientes = () => {
  const { data: clientes, loading, error, refetch } = useFetch("http://localhost:5000/clientes");

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", telefono: "" });
  const [busqueda, setBusqueda] = useState("");

  const columns = [
    { header: "ID", accessor: "id", type: "text" },
    { header: "Nombre", accessor: "nombre", type: "text" },
    { header: "Teléfono", accessor: "telefono", type: "text" },
    { header: "Acciones", accessor: "acciones", type: "actions" },
  ];

  const renderActions = (cliente) => (
    <>
      <ActionButton variant="edit" onClick={() => handleEditCliente(cliente)}>
        <i className="fa-solid fa-pencil"></i>
      </ActionButton>
      <ActionButton variant="delete" onClick={() => handleDeleteCliente(cliente.id)}>
        <i className="fa-solid fa-xmark"></i>
      </ActionButton>
    </>
  );

  const handleAddCliente = async (e) => {
    e.preventDefault();
    if (!nuevoCliente.nombre || !nuevoCliente.telefono) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await addCliente(nuevoCliente);
      refetch();
      setShowModal(false);
      setNuevoCliente({ nombre: "", telefono: "" });
    } catch (error) {
      console.error("Error al agregar cliente:", error);
    }
  };

  const handleDeleteCliente = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      await deleteCliente(id);
      refetch();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  const handleEditCliente = (cliente) => {
    setIsEditing(true);
    setClienteSeleccionado(cliente);
    setShowModal(true);
  };

  const handleUpdateCliente = async (e) => {
    e.preventDefault();
    if (!clienteSeleccionado.nombre || !clienteSeleccionado.telefono) {
      alert("Por favor completa todos los campos");
      return;
    }

    await fetch(`http://localhost:5000/clientes/${clienteSeleccionado.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clienteSeleccionado),
    });

    refetch();
    setShowModal(false);
    setIsEditing(false);
    setClienteSeleccionado(null);
  };

  if (loading) return <p style={{ padding: "20px" }}>Cargando clientes...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const clientesFiltrados = clientes.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const dataWithActions = clientesFiltrados.map((c) => ({
    ...c,
    acciones: renderActions(c),
  }));

  return (
    <PageContainer>
      <Sidebar />
      <MainContent
        title="Gestión de Clientes"
        description="Registra y administra la información de tus clientes."
      >
        <PageActions>
          <SearchBar>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar por nombre o telefono.."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </SearchBar>
          <PrimaryButton
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setNuevoCliente({ nombre: "", telefono: "" });
            }}
          >
            <i className="fa-solid fa-plus"></i>
            Nuevo Cliente
          </PrimaryButton>
        </PageActions>

        <ContentWrapper>
          <DataTable columns={columns} data={dataWithActions} />
        </ContentWrapper>

        {showModal && (
          <ModalBackdrop onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>{isEditing ? "Editar Cliente" : "Agregar Nuevo Cliente"}</h3>
              <form
                onSubmit={isEditing ? handleUpdateCliente : handleAddCliente}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                {isEditing && (
                  <input
                    type="text"
                    value={clienteSeleccionado.id}
                    disabled
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "#f3f4f6",
                      color: "#555",
                    }}
                  />
                )}
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={isEditing ? clienteSeleccionado.nombre : nuevoCliente.nombre}
                  onChange={(e) =>
                    isEditing
                      ? setClienteSeleccionado({
                          ...clienteSeleccionado,
                          nombre: e.target.value,
                        })
                      : setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  value={isEditing ? clienteSeleccionado.telefono : nuevoCliente.telefono}
                  onChange={(e) =>
                    isEditing
                      ? setClienteSeleccionado({
                          ...clienteSeleccionado,
                          telefono: e.target.value,
                        })
                      : setNuevoCliente({ ...nuevoCliente, telefono: e.target.value })
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px",
                    borderRadius: "6px",
                    backgroundColor: "var(--primary-blue)",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  {isEditing ? "Guardar Cambios" : "Guardar Cliente"}
                </button>
              </form>
            </ModalContent>
          </ModalBackdrop>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default Clientes;

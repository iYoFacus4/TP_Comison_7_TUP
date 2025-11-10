import React, { useState } from "react";
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import DataTable from "../components/tables/datatable";
import { addProducto, deleteProducto, updateProducto } from "../services/productosService";
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

const Productos = () => {
  const { data: productos, loading, error, refetch } = useFetch("http://localhost:5000/productos");

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: "", precio: "" });
  const [busqueda, setBusqueda] = useState("");

  const columns = [
    { header: "ID", accessor: "id", type: "text" },
    { header: "Nombre", accessor: "nombre", type: "text" },
    { header: "Precio ($)", accessor: "precio", type: "text" },
    { header: "Acciones", accessor: "acciones", type: "actions" },
  ];

  const renderActions = (producto) => (
    <>
      <ActionButton variant="edit" onClick={() => handleEditProducto(producto)}>
        <i className="fa-solid fa-pencil"></i>
      </ActionButton>
      <ActionButton variant="delete" onClick={() => handleDeleteProducto(producto.id)}>
        <i className="fa-solid fa-xmark"></i>
      </ActionButton>
    </>
  );

  const handleAddProducto = async (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await addProducto(nuevoProducto);
      refetch();
      setShowModal(false);
      setNuevoProducto({ nombre: "", precio: "" });
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleDeleteProducto = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    try {
      await deleteProducto(id);
      refetch();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleEditProducto = (producto) => {
    setIsEditing(true);
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleUpdateProducto = async (e) => {
    e.preventDefault();
    if (!productoSeleccionado.nombre || !productoSeleccionado.precio) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      await updateProducto(productoSeleccionado.id, productoSeleccionado);
      refetch();
      setShowModal(false);
      setIsEditing(false);
      setProductoSeleccionado(null);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Cargando productos...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>;

  const productosFiltrados = productos
    ? productos.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      )
 : [];

  const dataWithActions = productosFiltrados.map((p) => ({
    ...p,
    acciones: renderActions(p),
  }));

  return (
    <PageContainer>
      <Sidebar />
      <MainContent title="Gestión de Productos" description="Administra los productos de tu tienda.">
        <PageActions>
          <SearchBar>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </SearchBar>
          <PrimaryButton
            onClick={() => {
              setShowModal(true);
              setIsEditing(false);
              setNuevoProducto({ nombre: "", precio: "" });
            }}
          >
            <i className="fa-solid fa-plus"></i>
            Nuevo Producto
          </PrimaryButton>
        </PageActions>

        <ContentWrapper>
          <DataTable columns={columns} data={dataWithActions} />
        </ContentWrapper>

        {showModal && (
          <ModalBackdrop onClick={() => setShowModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <h3>{isEditing ? "Editar Producto" : "Agregar Nuevo Producto"}</h3>
              <form
                onSubmit={isEditing ? handleUpdateProducto : handleAddProducto}
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
                    value={productoSeleccionado.id}
                    disabled
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      backgroundColor: "#f3f4f6",
                    }}
                  />
                )}
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={isEditing ? productoSeleccionado.nombre : nuevoProducto.nombre}
                  onChange={(e) =>
                    isEditing
                      ? setProductoSeleccionado({
                          ...productoSeleccionado,
                          nombre: e.target.value,
                        })
                      : setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={isEditing ? productoSeleccionado.precio : nuevoProducto.precio}
                  onChange={(e) =>
                    isEditing
                      ? setProductoSeleccionado({
                          ...productoSeleccionado,
                          precio: e.target.value,
                        })
                      : setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                  }
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
                  {isEditing ? "Guardar Cambios" : "Guardar Producto"}
                </button>
              </form>
            </ModalContent>
          </ModalBackdrop>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default Productos;

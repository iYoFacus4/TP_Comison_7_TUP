import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import Sidebar from "../layout/sidebar";
import MainContent from "../layout/maincontent";
import DataTable from "../components/tables/datatable";
import { getProductos, addProducto, deleteProducto, updateProducto } from "../services/productosService";



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

// Input simple para el modal
const ModalInput = styled.input`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box; /* Asegura que el padding no afecte el ancho */
`;

// Botón simple para el modal
const ModalButton = styled.button`
  padding: 10px;
  border-radius: 6px;
  background-color: var(--primary-blue);
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  width: 100%;
  &:hover {
    background-color: var(--primary-blue-dark);
  }
`;

const FormError = styled.p`
  color: #DC2626;
  font-size: 0.85rem;
  margin: 0;
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
// ... Fin de styled-components

const Productos = () => {

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  
  const [nuevoProducto, setNuevoProducto] = useState({
    name: "",
    price: "",
    stock: 0,
    talle: "",
    color: "",
  });
  const [busqueda, setBusqueda] = useState("");
  const [formError, setFormError] = useState(""); // Para reemplazar 'alert'

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const res = await getProductos();
        setProductos(res.data);
      } catch (err) {
        setError(err.message || "Error al cargar productos");
      }
      setLoading(false);
    };

    loadProductos();
  }, []); // El array vacío asegura que se ejecute solo 1 vez

  const columns = [
    { header: "ID", accessor: "id", type: "text" },
    { header: "Nombre", accessor: "name", type: "text" },
    { header: "Precio ($)", accessor: "price", type: "text" },
    { header: "Stock", accessor: "stock", type: "text" },
    { header: "Talle", accessor: "talle", type: "text" },
    { header: "Color", accessor: "color", type: "text" },
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
    if (!nuevoProducto.name || !nuevoProducto.price) {
      setFormError("Nombre y Precio son campos obligatorios");
      return;
    }

    try {
      const res = await addProducto(nuevoProducto); // El servicio nos devuelve el producto creado
      setProductos([...productos, res.data]); 
      setShowModal(false);
      setNuevoProducto({ name: "", price: "", stock: 0, talle: "", color: "" }); // Reseteamos form
      setFormError("");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setFormError("Error al agregar el producto");
    }
  };

  const handleDeleteProducto = async (id) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter((p) => p.id !== id)); 
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleEditProducto = (producto) => {
    setIsEditing(true);
    setProductoSeleccionado({ ...producto });
    setShowModal(true);
    setFormError("");
  };

  const handleUpdateProducto = async (e) => {
    e.preventDefault();
    if (!productoSeleccionado.name || !productoSeleccionado.price) {
      setFormError("Nombre y Precio son campos obligatorios");
      return;
    }

    try {
      const res = await updateProducto(productoSeleccionado.id, productoSeleccionado);
      setProductos(
        productos.map((p) => (p.id === productoSeleccionado.id ? res.data : p))
      );
      setShowModal(false);
      setIsEditing(false);
      setProductoSeleccionado(null);
      setFormError("");
    } catch (error) {<img src="https://i.imgur.com/8GqG0bF.png" alt="error al actualizar" />} {
      console.error("Error al actualizar producto:", error);
      setFormError("Error al actualizar el producto");
    }
  };


  if (loading) return <p style={{ padding: "20px" }}>Cargando productos...</p>;
  if (error) return <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>;

  const productosFiltrados = productos
    ? productos.filter((p) =>
        p.name.toLowerCase().includes(busqueda.toLowerCase())
      )
    : [];

  const dataWithActions = productosFiltrados.map((p) => ({
    ...p,
    acciones: renderActions(p),
  }));

  // Función para manejar cambios en los inputs del modal
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setProductoSeleccionado({ ...productoSeleccionado, [name]: value });
    } else {
      setNuevoProducto({ ...nuevoProducto, [name]: value });
    }
  };

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
              // Reseteamos el form completo
              setNuevoProducto({ name: "", price: "", stock: 0, talle: "", color: "" });
              setFormError("");
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
                  gap: "15px", // Aumentamos el espacio
                  marginTop: "20px",
                }}
              >
                {/* CAMPO: Nombre (name) */}
                <ModalInput
                  type="text"
                  name="name" // <-- CAMBIO
                  placeholder="Nombre del producto"
                  value={isEditing ? productoSeleccionado.name : nuevoProducto.name}
                  onChange={handleModalChange}
                />

                {/* CAMPO: Precio (price) */}
                <ModalInput
                  type="number"
                  name="price"
                  placeholder="Precio"
                  value={isEditing ? productoSeleccionado.price : nuevoProducto.price}
                  onChange={handleModalChange}
                />

                {/* CAMPO: Stock - NUEVO */}
                <ModalInput
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={isEditing ? productoSeleccionado.stock : nuevoProducto.stock}
                  onChange={handleModalChange}
                />

                {/* CAMPO: Talle - NUEVO */}
                <ModalInput
                  type="text"
                  name="talle"
                  placeholder="Talle"
                  value={isEditing ? productoSeleccionado.talle : nuevoProducto.talle}
                  onChange={handleModalChange}
                />

                {/* CAMPO: Color - NUEVO */}
                <ModalInput
                  type="text"
                  name="color"
                  placeholder="Color"
                  value={isEditing ? productoSeleccionado.color : nuevoProducto.color}
                  onChange={handleModalChange}
                />
                
                {formError && <FormError>{formError}</FormError>}

                <ModalButton type="submit">
                  {isEditing ? "Guardar Cambios" : "Guardar Producto"}
                </ModalButton>
              </form>
            </ModalContent>
          </ModalBackdrop>
        )}
      </MainContent>
    </PageContainer>
  );
};

export default Productos;
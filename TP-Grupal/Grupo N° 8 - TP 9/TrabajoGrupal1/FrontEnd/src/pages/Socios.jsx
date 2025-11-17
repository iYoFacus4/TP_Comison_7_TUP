// FrontEnd/src/pages/Socios.jsx (MODIFICADO)
import { useState, useEffect } from "react";
import MembersList from "../components/MembersList";
import MemberDetail from "../components/MemberDetail";
import "./Socios.css";

// 1. IMPORTAMOS EL apiService
import apiService from "../services/apiService.js";

const Socios = () => {
  // 2. RENOMBRAMOS A 'socios' Y AGREGAMOS ESTADOS DE CARGA Y ERROR
  const [socios, setSocios] = useState([]);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. useEffect TOTALMENTE NUEVO: Carga datos desde el Backend
  useEffect(() => {
    const loadSocios = async () => {
      try {
        setIsLoading(true);
        // ¡Aquí llamamos a tu API!
        const data = await apiService.getAll('socios');
        setSocios(data);
        // Seleccionamos el primer socio si la lista no está vacía
        if (data.length > 0) {
          setSelectedSocio(data[0]);
        }
      } catch (err) {
        setError(err.message || "Error al cargar los socios.");
      } finally {
        setIsLoading(false);
      }
    };

    loadSocios();
    // Toda la lógica de localStorage ha sido eliminada
  }, []); // El array vacío [] asegura que se ejecute solo una vez al cargar

  // Seleccionar un miembro (sin cambios)
  const handleSelectSocio = (socio) => {
    setSelectedSocio(socio);
  };

  // 4. CRUD: Agregar nuevo miembro (CONECTADO AL BACKEND)
  const handleAddMember = async () => {
    // Datos de ejemplo para un nuevo socio
    const newSocioData = {
      nombre: "Nuevo Socio",
      email: `nuevo${Date.now()}@example.com`,
      dni: `${Date.now()}`,
      telefono: "123-456-7890",
      fecha_nacimiento: "2000-01-01",
    };

    try {
      // Llamamos a la API para CREAR el socio
      const createdSocio = await apiService.createItem('socios', newSocioData);
      
      // Actualizamos el estado local
      const updatedSocios = [...socios, createdSocio];
      setSocios(updatedSocios);
      setSelectedSocio(createdSocio);

    } catch (err) {
      setError(err.message || "Error al agregar el socio.");
    }
  };

  // 5. CRUD: Actualizar miembro (CONECTADO AL BACKEND)
  const handleUpdateMember = async (updatedSocio) => {
    try {
      // Llamamos a la API para ACTUALIZAR
      await apiService.updateItem('socios', updatedSocio.id, updatedSocio);
      
      // Actualizamos el estado local
      const updatedSocios = socios.map((socio) =>
        socio.id === updatedSocio.id ? updatedSocio : socio
      );
      setSocios(updatedSocios);
      setSelectedSocio(updatedSocio);

    } catch (err) {
      setError(err.message || "Error al actualizar el socio.");
    }
  };

  // 6. CRUD: Eliminar miembro (CONECTADO AL BACKEND)
  const handleDeleteMember = async (socioId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este miembro?"
    );
    if (confirmDelete) {
      try {
        // Llamamos a la API para ELIMINAR
        await apiService.deleteItem('socios', socioId);
        
        // Actualizamos el estado local
        const updatedSocios = socios.filter((socio) => socio.id !== socioId);
        setSocios(updatedSocios);
        setSelectedSocio(updatedSocios[0] || null);

      } catch (err) {
        setError(err.message || "Error al eliminar el socio.");
      }
    }
  };

  // 7. RENDERIZADO CON ESTADOS DE CARGA Y ERROR
  if (isLoading) {
    return <div className="socios-page">Cargando socios...</div>;
  }

  if (error) {
    return <div className="socios-page" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="socios-page">
      <div className="socios-content">
        {/* Lista de miembros (Panel izquierdo) */}
        <MembersList
          members={socios} // Pasamos los socios del backend
          selectedMember={selectedSocio}
          onSelectMember={handleSelectSocio}
          onAddMember={handleAddMember}
        />

        {/* Detalle del miembro (Panel derecho) */}
        {selectedSocio && (
          <MemberDetail
            member={selectedSocio}
            onUpdateMember={handleUpdateMember}
            onDeleteMember={handleDeleteMember}
          />
        )}
      </div>
    </div>
  );
};

export default Socios;
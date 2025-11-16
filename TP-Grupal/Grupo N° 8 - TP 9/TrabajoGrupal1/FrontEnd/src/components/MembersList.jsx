// /FrontEnd/src/components/MembersList/MembersList.jsx (VERSIÓN API)

import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import apiService from "../../apiService"; // <-- Importamos la API
import "./MembersList.css";

const MembersList = ({
  selectedMemberId,
  onSelectMember,
  onAddMember,
  listUpdatedTrigger, // Nueva prop para forzar la recarga
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función de API para cargar la lista de miembros
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getAll('members');
      setMembers(data);

      // Si la lista se carga, intentamos seleccionar el miembro previamente seleccionado.
      // Si no hay ninguno, seleccionamos el primero si existe.
      if (data.length > 0 && !data.find(m => m.id === selectedMemberId)) {
          // Si el miembro seleccionado ya no está o no se ha seleccionado, seleccionar el primero
          onSelectMember(data[0]);
      } else if (data.length === 0) {
          onSelectMember(null);
      }
    } catch (err) {
      console.error("Error al cargar miembros:", err);
      setError("No se pudieron cargar los socios.");
      setMembers([]);
      onSelectMember(null);
    } finally {
      setLoading(false);
    }
  };

  // Cargar miembros al montar el componente y cuando se dispara el trigger
  useEffect(() => {
    fetchMembers();
  }, [listUpdatedTrigger]); // Recarga cuando esta prop cambie

  // Filtrar miembros por búsqueda
  const filteredMembers = members.filter((member) =>
    member.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Manejar la selección de un miembro
  const handleSelect = (member) => {
      // Si ya está seleccionado, no hacer nada
      if (selectedMemberId === member.id) return;
      onSelectMember(member);
  }

  // Manejar el clic en agregar nuevo miembro
  const handleAddMember = () => {
    // Esto notifica al padre para mostrar el formulario de creación
    onAddMember();
  }


  if (loading) {
    return (
      <div className="members-list-container">
        <p className="text-center text-primary p-3">Cargando socios...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="members-list-container text-center p-3">
        <p className="text-danger">{error}</p>
        <Button variant="outline-primary" onClick={fetchMembers}>
            Reintentar Carga
        </Button>
      </div>
    );
  }

  return (
    <div className="members-list-container">
      {/* Barra de búsqueda */}
      <div className="search-section">
        <div className="search-input-wrapper">
          <i className="bi bi-search search-icon"></i>
          <Form.Control
            type="text"
            placeholder="Buscar miembros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-members"
            disabled={loading}
          />
        </div>
      </div>

      {/* Botón agregar nuevo miembro */}
      <Button
        variant="primary"
        className="add-member-btn"
        onClick={handleAddMember}
        disabled={loading}
      >
        <i className="bi bi-plus-lg me-2"></i>
        Agregar Nuevo Miembro
      </Button>

      {/* Lista de miembros */}
      <div className="members-list">
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`member-item ${
                selectedMemberId === member.id ? "active" : ""
              }`}
              onClick={() => handleSelect(member)}
            >
              <div className="member-item-content">
                <img
                  src={member.avatar}
                  alt={member.fullName}
                  className="member-avatar"
                />
                <span className="member-name">{member.fullName}</span>
              </div>
              <i className="bi bi-chevron-right arrow-icon"></i>
            </div>
          ))
        ) : (
          <div className="no-members text-center p-3 text-muted">
            <p className="mb-0">No se encontraron miembros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;
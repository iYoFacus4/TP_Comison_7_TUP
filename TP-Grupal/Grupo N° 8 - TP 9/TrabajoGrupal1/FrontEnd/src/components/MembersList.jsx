// FrontEnd/src/components/MembersList.jsx (CORREGIDO)
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./MembersList.css";

const MembersList = ({
  members,
  selectedMember,
  onSelectMember,
  onAddMember,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar miembros (ahora por 'nombre')
  const filteredMembers = members.filter((member) =>
    member.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          />
        </div>
      </div>

      {/* Botón agregar nuevo miembro */}
      <Button
        variant="primary"
        className="add-member-btn"
        onClick={onAddMember}
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
                selectedMember?.id === member.id ? "active" : ""
              }`}
              onClick={() => onSelectMember(member)}
            >
              <div className="member-item-content">
                {/* ¡CAMBIO AQUÍ! 
                  Ya no tenemos 'avatar'. Usamos un ícono genérico. 
                */}
                <div className="member-avatar-placeholder">
                  <i className="bi bi-person-fill"></i>
                </div>
                {/* ¡CAMBIO AQUÍ! Usamos 'nombre' en vez de 'fullName' */}
                <span className="member-name">{member.nombre}</span>
              </div>
              <i className="bi bi-chevron-right arrow-icon"></i>
            </div>
          ))
        ) : (
          <div className="no-members">
            <p>No se encontraron miembros</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;
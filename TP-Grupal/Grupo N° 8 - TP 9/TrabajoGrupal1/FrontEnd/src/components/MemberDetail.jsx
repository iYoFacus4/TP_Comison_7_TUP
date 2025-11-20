// FrontEnd/src/components/MemberDetail.jsx (CÓDIGO COMPLETO Y FINAL)
import { useState, useEffect } from "react";
import { Form, Button, Nav, Spinner, Table, Alert } from "react-bootstrap";
import "./MemberDetail.css";

// 1. Importamos el apiService
import apiService from "../services/apiService"; 

// 2. Función para formatear fecha 'YYYY-MM-DD'
const formatISODate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = date.getUTCDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch (e) {
    return ''; 
  }
};

const MemberDetail = ({ member, onUpdateMember, onDeleteMember }) => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...member });
  
  const [availableSports, setAvailableSports] = useState([]); 
  const [selectedSportIds, setSelectedSportIds] = useState([]); 
  const [isLoadingSports, setIsLoadingSports] = useState(false);
  
  // ESTADOS PARA EL HISTORIAL DE PAGOS
  const [paymentHistory, setPaymentHistory] = useState([]); 
  const [historyLoading, setHistoryLoading] = useState(false); 
  const [historyError, setHistoryError] = useState(null); 

  // 3. useEffect MODIFICADO: Carga datos del socio Y sus deportes
  useEffect(() => {
    // 3a. Resetea el formulario con los datos del socio
    setFormData({ 
      ...member,
      fecha_nacimiento: formatISODate(member.fecha_nacimiento)
    });
    setIsEditing(false);
    setActiveTab("personal");
    
    const loadSportsData = async () => {
      if (!member || !member.id) return; 
      
      setIsLoadingSports(true);
      try {
        // 4. Hacemos DOS llamadas a la API en paralelo
        const [allSportsData, socioSportsData] = await Promise.all([
          apiService.getAll('deportes?estado=Activo'), // Deportes disponibles
          apiService.getAll(`socios/${member.id}/deportes`) // Deportes del socio
        ]);
        
        setAvailableSports(allSportsData); 
        setSelectedSportIds(socioSportsData); 

      } catch (err) {
        console.error("Error al cargar deportes: ", err);
      } finally {
        setIsLoadingSports(false);
      }
    };

    loadSportsData();
  }, [member]); // Se ejecuta cada vez que 'member' cambia

  // 4. useEffect para cargar el historial de pagos
  useEffect(() => {
    if (member && member.id && activeTab === "payment") {
      const fetchHistory = async () => {
        setHistoryLoading(true);
        setHistoryError(null);
        try {
          const history = await apiService.getAll(`socios/${member.id}/cuotas`);
          setPaymentHistory(history);
        } catch (err) {
          setHistoryError("No se pudo cargar el historial de pagos.");
          console.error(err);
        } finally {
          setHistoryLoading(false);
        }
      };
      fetchHistory();
    }
  }, [member, activeTab]); // Recarga si cambia el socio o la pestaña

  // 5. Manejadores de cambios
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, }));
  };

  const handleSportChange = (sportId) => {
    setSelectedSportIds((prevIds) => 
      prevIds.includes(sportId)
        ? prevIds.filter((id) => id !== sportId) // Lo quita
        : [...prevIds, sportId] // Lo agrega
    );
  };

  // 6. Manejadores de acciones
  const handleSaveChanges = () => {
    const dataParaEnviar = {
      ...formData,
      // ¡Enviamos el array de IDs de deportes!
      associatedSports: selectedSportIds 
    };
    onUpdateMember(dataParaEnviar);
    setIsEditing(false);
  };

  const handleCancel = () => {
     setFormData({ 
      ...member,
      fecha_nacimiento: formatISODate(member.fecha_nacimiento)
    });
    setIsEditing(false);
  };
  
  const handleDelete = () => onDeleteMember(member.id);

  // 7. Renderizado final
  return (
    <div className="member-detail-container">
      {/* --- HEADER --- */}
      <div className="member-header">
        <div className="member-header-left">
          <div className="avatar-wrapper">
             <div className="member-avatar-placeholder large">
               <i className="bi bi-person-fill"></i>
             </div>
          </div>
          <div className="member-header-info">
            <h2 className="member-detail-name">{formData.nombre}</h2>
            <p className="member-since">Miembro desde: {new Date(member.fecha_alta).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="member-header-actions">
          {!isEditing ? (
            <>
              <Button variant="outline-primary" className="edit-btn" onClick={() => setIsEditing(true)}>
                Editar
              </Button>
              <Button variant="outline-danger" className="delete-btn" onClick={handleDelete}>
                Eliminar
              </Button>
            </>
          ) : null}
        </div>
      </div>

      {/* --- TABS --- */}
      <Nav variant="tabs" className="member-tabs">
        <Nav.Item>
          <Nav.Link active={activeTab === "personal"} onClick={() => setActiveTab("personal")}>
            Datos Personales
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active={activeTab === "payment"} onClick={() => setActiveTab("payment")}>
            Historial de Pagos
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* --- CONTENIDO DE TABS --- */}
      <div className="tab-content">
        {activeTab === "personal" && (
          <div className="personal-details-tab">
            
            {/* --- CAMPOS DE DATOS PERSONALES --- */}
            <div className="form-row">
              <div className="form-group-member">
                <label>Nombre Completo</label>
                <Form.Control type="text" name="nombre" value={formData.nombre || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
              <div className="form-group-member">
                <label>DNI</label>
                <Form.Control type="text" name="dni" value={formData.dni || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-member">
                <label>Correo Electrónico</label>
                <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
              <div className="form-group-member">
                <label>Número de Teléfono</label>
                <Form.Control type="text" name="telefono" value={formData.telefono || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group-member">
                <label>Fecha de Nacimiento</label>
                <Form.Control type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento || ''} onChange={handleInputChange} disabled={!isEditing} className="member-input" />
              </div>
            </div>

            {/* --- SECCIÓN DE DEPORTES ASOCIADOS --- */}
            <div className="sports-section">
              <label className="sports-label">Deportes Asociados</label>
              <div className="sports-checkboxes">
                {isLoadingSports ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  availableSports.map((sport) => (
                    <div
                      key={sport.id}
                      className={`sport-checkbox-card ${
                        selectedSportIds.includes(sport.id) ? "checked" : ""
                      }`}
                    >
                      <Form.Check
                        type="checkbox"
                        id={`sport-${sport.id}`}
                        label={sport.nombre} 
                        checked={selectedSportIds.includes(sport.id)}
                        onChange={() => handleSportChange(sport.id)}
                        disabled={!isEditing}
                        className="sport-checkbox"
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB DE HISTORIAL DE PAGOS */}
        {activeTab === "payment" && (
          <div className="payment-tab">
            {historyError && <Alert variant="danger">{historyError}</Alert>}
            
            {historyLoading ? (
              <Spinner animation="border" />
            ) : paymentHistory.length === 0 ? (
              <p>Este socio no tiene cuotas registradas.</p>
            ) : (
              <Table striped bordered hover size="sm" className="mt-3">
                <thead>
                  <tr>
                    <th>Fecha Venc.</th>
                    <th>Monto</th>
                    <th>Membresía</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((p) => (
                    <tr key={p.id}>
                      <td>{p.fecha_vencimiento}</td>
                      {/* CORRECCIÓN: Convertimos a Number antes de usar toFixed */}
                      <td>${Number(p.monto || 0).toFixed(2)}</td>
                      <td>{p.membresia}</td>
                      <td>{p.estado}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        )}
      </div>

      {/* --- BOTONES DE GUARDAR --- */}
      {isEditing && (
        <div className="form-actions">
          <Button variant="secondary" className="cancel-btn" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="primary" className="save-btn" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;
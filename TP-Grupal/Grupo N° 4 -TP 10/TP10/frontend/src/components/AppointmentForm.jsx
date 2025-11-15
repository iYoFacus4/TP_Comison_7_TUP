/* eslint-disable no-irregular-whitespace */
import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";


const initialState = {
 clientId: "",
 serviceId: "",
 date: "",
time: "",
};

export default function AppointmentForm({
 clients = [],
 services = [],
 onSave,
 editingAppointment,
 setEditingAppointment,
}) {
  
 const [formData, setFormData] = useState(initialState);

 useEffect(() => {
 if (editingAppointment) {
 setFormData({
 clientId: editingAppointment.clientId || "", 
serviceId: editingAppointment.serviceId || "",
 date: editingAppointment.date || "",
 time: editingAppointment.time || "",
 });
 } else {
 setFormData(initialState); // Sigue usando la constante
 }
    
  }, [editingAppointment]);

 const handleChange = (e) => {
 const { name, value } = e.target;
 setFormData((prev) => ({
 ...prev,

 [name]: value,
})); };

const handleSubmit = async (e) => { // 1. Convertir en async
e.preventDefault();
if (!formData.clientId || !formData.serviceId || !formData.date || !formData.time) {
 alert("Por favor, completa todos los campos (Cliente, Servicio, Fecha y Hora).");
 return;
 }

    try {
    
await onSave(formData, editingAppointment ? editingAppointment.id : null);
      
      setFormData(initialState);
      if (setEditingAppointment) {
        setEditingAppointment(null);
      }

    } catch (error) {
     
      console.error("Error al guardar:", error);
      alert("Error al guardar el turno: " + error.message);
    }
 };


  const handleCancelEdit = () => {
    setFormData(initialState);
    if (setEditingAppointment) {
      setEditingAppointment(null);
    }
  };

return (
    <div>
      <h5>{editingAppointment ? "Editar Turno" : "Asignar Turno"}</h5>
      
      <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
              >
                <option value="">Seleccionar cliente...</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Servicio</Form.Label>
              <Form.Select
                name="serviceId"
                value={formData.serviceId}
                onChange={handleChange}
              >
                <option value="">Seleccionar servicio...</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="primary" type="submit" className="w-100">
              {editingAppointment ? "Guardar Cambios" : "Asignar"}
            </Button>
          </Col>
        </Row>

        {editingAppointment && (
          <Button 
            variant="secondary" 
            onClick={handleCancelEdit} 
            className="mt-2"
          >
            Cancelar Edición
          </Button>
        )}
      </Form>
    </div>
  );
}
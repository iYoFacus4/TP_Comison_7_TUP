import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Alert } from 'react-bootstrap';
import { ESPECIALIDADES, HORARIOS_DISPONIBLES } from '../constants';
import { generateId } from '../utils/helpers';

const TurnoForm = ({ turno = null, onSave, onCancel, turnosExistentes = [] }) => {
  const [formData, setFormData] = useState({
    paciente: '',
    medico: '',
    fecha: '',
    hora: '',
    especialidad: '',
    telefono: '',
    email: '',
    observaciones: ''
  });
  const [errors, setErrors] = useState({});
  const [isEditing] = useState(!!turno);

  useEffect(() => {
    if (turno) {
      setFormData({
        paciente: turno.paciente || '',
        medico: turno.medico || '',
        fecha: turno.fecha || '',
        hora: turno.hora || '',
        especialidad: turno.especialidad || '',
        telefono: turno.telefono || '',
        email: turno.email || '',
        observaciones: turno.observaciones || ''
      });
    } else {
      // Establecer fecha por defecto como hoy
      const hoy = new Date().toISOString().split('T')[0];
      setFormData(prev => ({ ...prev, fecha: hoy }));
    }
  }, [turno]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.paciente.trim()) {
      newErrors.paciente = 'El nombre del paciente es requerido';
    }

    if (!formData.medico.trim()) {
      newErrors.medico = 'El nombre del médico es requerido';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es requerida';
    }

    if (!formData.hora) {
      newErrors.hora = 'La hora es requerida';
    }

    if (!formData.especialidad) {
      newErrors.especialidad = 'La especialidad es requerida';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    // Validar superposición de horarios
    const conflicto = turnosExistentes.find(t => 
      t.fecha === formData.fecha && 
      t.hora === formData.hora && 
      t.medico === formData.medico &&
      (!isEditing || t.id !== turno.id)
    );

    if (conflicto) {
      newErrors.hora = `Ya existe un turno con el Dr. ${formData.medico} a las ${formData.hora}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const turnoData = {
        ...formData,
        id: isEditing ? turno.id : generateId(),
        status: isEditing ? turno.status : 'Pendiente'
      };
      
      onSave(turnoData);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Paciente *</Form.Label>
            <Form.Control
              type="text"
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              isInvalid={!!errors.paciente}
              placeholder="Ingrese el nombre completo"
            />
            <Form.Control.Feedback type="invalid">
              {errors.paciente}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Médico *</Form.Label>
            <Form.Control
              type="text"
              name="medico"
              value={formData.medico}
              onChange={handleChange}
              isInvalid={!!errors.medico}
              placeholder="Ej: Dr. García"
            />
            <Form.Control.Feedback type="invalid">
              {errors.medico}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Fecha *</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              isInvalid={!!errors.fecha}
              min={new Date().toISOString().split('T')[0]}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fecha}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Hora *</Form.Label>
            <Form.Select
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              isInvalid={!!errors.hora}
            >
              <option value="">Seleccione una hora</option>
              {HORARIOS_DISPONIBLES.map(hora => (
                <option key={hora} value={hora}>{hora}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.hora}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Especialidad *</Form.Label>
            <Form.Select
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              isInvalid={!!errors.especialidad}
            >
              <option value="">Seleccione una especialidad</option>
              {ESPECIALIDADES.map(esp => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.especialidad}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono *</Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              isInvalid={!!errors.telefono}
              placeholder="Ej: 123-456-7890"
            />
            <Form.Control.Feedback type="invalid">
              {errors.telefono}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="ejemplo@email.com"
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          placeholder="Observaciones adicionales (opcional)"
        />
      </Form.Group>

      {Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          <strong>Por favor corrija los siguientes errores:</strong>
          <ul className="mb-0 mt-2">
            {Object.values(errors).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}
    </Form>
  );
};

export default TurnoForm;

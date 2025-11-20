// FrontEnd/src/components/RegisterPaymentModal.jsx
import { useState } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import apiService from '../services/apiService'; 

const RegisterPaymentModal = ({ show, handleClose, onPaymentRegistered }) => {
  const [formData, setFormData] = useState({
    dni: '',
    monto: '',
    meses: 1
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validación simple
    if (!formData.dni || !formData.monto || formData.meses < 1) {
      setError("Todos los campos son obligatorios y Meses debe ser al menos 1.");
      setLoading(false);
      return;
    }
    
    // Convertir monto y meses a números
    const monto = parseFloat(formData.monto);
    const meses = parseInt(formData.meses, 10);

    try {
      // 1. Llamada a la API para registrar pago por DNI
      const response = await apiService.registerPaymentByDni(formData.dni, monto, meses);
      
      // 2. Éxito: Notificar al componente padre (Dashboard o Pagos)
      alert(response.message);
      
      // 3. Limpiar y cerrar
      setFormData({ dni: '', monto: '', meses: 1 });
      onPaymentRegistered(); // Función para recargar datos en el padre
      handleClose();

    } catch (err) {
      setError(err.message || "Error desconocido al registrar el pago.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Pago Global por DNI</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="formDni">
            <Form.Label>DNI del Socio</Form.Label>
            <Form.Control type="text" name="dni" value={formData.dni} onChange={handleChange} required disabled={loading} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formMonto">
            <Form.Label>Monto por Cuota ($)</Form.Label>
            <Form.Control type="number" name="monto" value={formData.monto} onChange={handleChange} required min="0.01" step="0.01" disabled={loading} />
          </Form.Group>
          
          <Form.Group className="mb-3" controlId="formMeses">
            <Form.Label>Cantidad de Meses a Pagar</Form.Label>
            <Form.Control type="number" name="meses" value={formData.meses} onChange={handleChange} required min="1" disabled={loading} />
            <Form.Text className="text-muted">Se registrarán {formData.meses} cuotas como Pagadas.</Form.Text>
          </Form.Group>
          
          <div className="d-grid mt-4">
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Registrar Pago(s)'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterPaymentModal;
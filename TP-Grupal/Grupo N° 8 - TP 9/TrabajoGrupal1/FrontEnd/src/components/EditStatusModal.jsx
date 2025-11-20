// FrontEnd/src/components/EditStatusModal.jsx
import { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import apiService from '../services/apiService';

const EditStatusModal = ({ show, handleClose, cuota, onStatusUpdated, setError }) => {
    const [newStatus, setNewStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [internalError, setInternalError] = useState(null);

    useEffect(() => {
        if (cuota) {
            setNewStatus(cuota.estado);
            setInternalError(null);
        }
    }, [cuota]);

    const handleSave = async () => {
        setLoading(true);
        setInternalError(null);

        try {
            // 1. Llamamos a la API para actualizar el estado
            await apiService.updateItem('cuotas', cuota.id, { estado: newStatus });
            
            // 2. Actualizamos el estado en el componente padre
            const updatedCuota = { ...cuota, estado: newStatus };
            onStatusUpdated(updatedCuota); // Llama a la función de PaymentGroupedList
            
        } catch (err) {
            const msg = err.message || "Error al actualizar el estado de la cuota.";
            setInternalError(msg);
            setError(msg); // También lo mostramos en el padre
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cuota N° {cuota?.id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {internalError && <Alert variant="danger">{internalError}</Alert>}
                <p>Socio: <strong>{cuota?.miembro}</strong></p>
                <p>Monto: <strong>${Number(cuota?.cuota).toFixed(2)}</strong></p>
                
                <Form.Group className="mb-3">
                    <Form.Label>Nuevo Estado</Form.Label>
                    <Form.Select 
                        value={newStatus} 
                        onChange={(e) => setNewStatus(e.target.value)}
                        disabled={loading}
                    >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Vencido">Vencido</option>
                        <option value="Pagado">Pagado</option>
                    </Form.Select>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={loading}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Guardar'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditStatusModal;
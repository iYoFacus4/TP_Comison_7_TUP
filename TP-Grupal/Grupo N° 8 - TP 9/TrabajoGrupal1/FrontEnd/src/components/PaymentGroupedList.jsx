// FrontEnd/src/components/PaymentGroupedList.jsx
import { Accordion, Badge, Button, Table, Alert } from 'react-bootstrap';
import { useState } from 'react';
import EditStatusModal from './EditStatusModal'; // <-- MODAL DE EDICIÓN (Crearemos abajo)

const PaymentGroupedList = ({ groupedPayments, payments, setPayments, setError }) => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCuota, setEditingCuota] = useState(null);

    // Función para manejar el clic en Editar (abre el modal)
    const handleEditClick = (cuota) => {
        setEditingCuota(cuota);
        setShowEditModal(true);
    };

    // Función que se llama después de que el modal actualiza el estado
    const handleStatusUpdated = (updatedCuota) => {
        // Lógica de actualización del estado global (payments) que está en Pagos.jsx
        // Esto asegura que la tabla refleje los cambios inmediatamente
        const updatedPayments = payments.map(p => 
            p.id === updatedCuota.id ? updatedCuota : p
        );
        setPayments(updatedPayments);
        setShowEditModal(false);
    };

    const getStatusBadge = (estado) => {
        switch (estado) {
            case "Pagado": return <Badge bg="success">Pagado</Badge>;
            case "Vencido": return <Badge bg="danger">Vencido</Badge>;
            case "Pendiente": return <Badge bg="warning" text="dark">Pendiente</Badge>;
            default: return <Badge bg="secondary">{estado}</Badge>;
        }
    };

    const membersArray = Object.values(groupedPayments);

    if (membersArray.length === 0) {
        return <Alert variant="info" className="mt-4">No se encontraron cuotas registradas.</Alert>;
    }

    return (
        <div className="mt-4">
            <Accordion defaultActiveKey="0">
                {membersArray.map((member, index) => (
                    <Accordion.Item eventKey={index.toString()} key={member.id}>
                        <Accordion.Header>
                            <div style={{ flexGrow: 1, fontWeight: 'bold' }}>
                                👥 {member.nombre} - ({member.dni})
                            </div>
                            <span style={{ marginRight: '20px', color: '#ccc' }}>
                                Cuotas: {member.cuotas.length}
                            </span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Table striped hover size="sm">
                                <thead>
                                    <tr>
                                        <th>ID Cuota</th>
                                        <th>Monto</th>
                                        <th>Vencimiento</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {member.cuotas.map(cuota => (
                                        <tr key={cuota.id}>
                                            <td>{cuota.id}</td>
                                            <td>${Number(cuota.cuota).toFixed(2)}</td>
                                            <td>{cuota.fecha_vencimiento}</td>
                                            <td>{getStatusBadge(cuota.estado)}</td>
                                            <td>
                                                <Button 
                                                    variant="link" 
                                                    size="sm" 
                                                    onClick={() => handleEditClick(cuota)}
                                                >
                                                    Editar Estado
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            {/* 7. MODAL DE EDICIÓN */}
            {editingCuota && (
                <EditStatusModal 
                    show={showEditModal} 
                    handleClose={() => setShowEditModal(false)}
                    cuota={editingCuota}
                    onStatusUpdated={handleStatusUpdated}
                    setError={setError}
                />
            )}
        </div>
    );
};

export default PaymentGroupedList;
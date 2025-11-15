import { useState, useEffect } from 'react';
import { hairServiceAPI } from '../services/hairServiceAPI';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import '../styles/hairServices.css';

function HairServicesManager() {
    const [services, setServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentService, setCurrentService] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        duration: '',
        price: ''
    });

    
    useEffect(() => {
        loadServices();
    }, []);

    
    const loadServices = async () => {
        try {
            const response = await hairServiceAPI.getServices();
            setServices(response.data);
        } catch (err) {
            alert(`Error al cargar los servicios: ${err.message}`);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

   
    const handleOpenModal = (service = null) => {
        if (service) {
            setFormData(service);
            setCurrentService(service);
        } else {
            setFormData({
                name: '',
                description: '',
                duration: '',
                price: ''
            });
            setCurrentService(null);
        }
        setShowModal(true);
    };

   
    const handleSaveService = async () => {
        try {
            const serviceData = {
                ...formData,
                duration: parseInt(formData.duration),
                price: parseFloat(formData.price)
            };

            if (currentService) {
                await hairServiceAPI.updateService(currentService.id, serviceData);
            } else {
                await hairServiceAPI.createService(serviceData);
            }

            setShowModal(false);
            loadServices();
            alert(currentService ? 'Servicio actualizado' : 'Servicio creado');
        } catch (err) {
            alert(`Error al guardar el servicio: ${err.message}`);
        }
    };

   
    const handleToggleAvailability = async (service) => {
        try {
            if (service.available) {
                await hairServiceAPI.deleteService(service.id);
            } else {
                await hairServiceAPI.restoreService(service.id);
            }
            loadServices();
        } catch (err) {
            alert(`Error al cambiar disponibilidad del servicio: ${err.message}`);
        }
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <h2>Gestión de Servicios</h2>
                    <Button 
                        variant="primary" 
                        onClick={() => handleOpenModal()}
                        className="mt-2"
                    >
                        Nuevo Servicio
                    </Button>
                </Col>
            </Row>

            <Row xs={1} md={2} lg={3} className="g-4">
                {services.map(service => (
                    <Col key={service.id}>
                        <Card className={!service.available ? 'bg-light' : ''}>
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text>
                                    {service.description}<br/>
                                    <strong>Duración:</strong> {service.duration} minutos<br/>
                                    <strong>Precio:</strong> ${service.price}
                                </Card.Text>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => handleOpenModal(service)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant={service.available ? "outline-danger" : "outline-success"}
                                        onClick={() => handleToggleAvailability(service)}
                                    >
                                        {service.available ? 'Deshabilitar' : 'Habilitar'}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

           
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {currentService ? 'Editar Servicio' : 'Nuevo Servicio'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Duración (minutos)</Form.Label>
                            <Form.Control
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveService}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default HairServicesManager;
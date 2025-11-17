// src/pages/Services.jsx
import React, { useState } from 'react';
import { Spinner, Alert, Button, ButtonGroup, Badge } from 'react-bootstrap';
import DataTable from '../components/DataTable';
import ServiceForm from '../components/ServiceForm'; 
import ServiceEditModal from '../components/ServiceEditModal'; 
import { useApi } from '../hooks/useApi'; 
import { getServices, deleteService } from '../services/hairServiceAPI'; 
import "../styles/services.css"; 


export default function Servicios() { 
 
  const { data: services, loading, error, refetch, setData } = useApi(getServices);

  
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleShowModal = (service) => {
    setSelectedService(service);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedService(null);
  };

 
  const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar ${name}?`)) {
      try {
        await deleteService(id);
        refetch(); 
      } catch (err) {
        alert('Error al eliminar el servicio.');
        console.error(err);
      }
    }
  };
  
  
  const handleServiceUpdated = (updatedService) => {
    handleCloseModal();
    setData(prevServices => 
      prevServices.map(service => 
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const handleServiceAdded = (createdService) => {
    
    setData(prevServices => [...prevServices, createdService]);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando servicios...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error al cargar datos: {error}</Alert>;
  }

  return (
    <>
      <div className="services-container">
        <h4 className="services-title">Gestión de Servicios</h4>
        
       <ServiceForm onServiceAdded={handleServiceAdded} />
        
        <div className="table-wrapper">
          <DataTable
            // 6. Columnas actualizadas
            columns={["Servicio", "Descripción", "Duración", "Precio", "Estado", "Acciones"]}
            data={services ? services.map((s) => [
              s.name,
              s.description,
              `${s.duration} min`,
              `$${s.price}`,
             
              <Badge bg={s.available ? "success" : "secondary"}>
                {s.available ? "Activo" : "Inactivo"}
              </Badge>,
             
              <ButtonGroup size="sm" key={s.id}> 
                <Button 
                  variant="outline-primary"
                  onClick={() => handleShowModal(s)}
                >
                  Editar
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={() => handleDelete(s.id, s.name)}
                >
                  Borrar
                </Button>
              </ButtonGroup>
            ]) : []}
          />
        </div>
      </div>

   
    <ServiceEditModal
        show={showModal}
        handleClose={handleCloseModal}
        service={selectedService}
        onUpdated={handleServiceUpdated}
      />
    </>
  );
}
// src/pages/Clients.jsx
import React from 'react';
import { useState } from 'react';
import { Spinner, Alert, Button, ButtonGroup } from 'react-bootstrap';
import DataTable from '../components/DataTable';
import ClientForm from '../components/ClientForm';
import ClientEditModal from '../components/ClientEditModal';
import { useApi } from '../hooks/useApi'; 
import {getClients,deleteClient} from '../services/clientService';
import "../styles/clients.css";

export default function Clients() {
  
  const { data: clients, loading, error, refetch, setData } = useApi(getClients);

  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleShowModal = (client) => {
    setSelectedClient(client); 
    setShowModal(true);      
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedClient(null); 
  };

 const handleDelete = async (id, name) => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar a ${name}?`)) {
      try {
        await deleteClient(id);
        alert('Cliente eliminado con éxito.');
        refetch(); 
      } catch (err) {
        alert('Error al eliminar el cliente.');
        console.error(err);
      }
    }
  };

  const handleClientUpdated = (updatedClient) => {
  
    handleCloseModal();
    
   
    setData(prevClients => 
      prevClients.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  };



  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted">Cargando clientes...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error al cargar datos: {error}</Alert>;
  }
return (
    <> 
      <div className="clients-container">
        <h4 className="clients-title">Gestión de Clientes</h4>
        
        
        <ClientForm onClientAdded={refetch} /> 
        
        <div className="table-wrapper">
          <DataTable
            
            columns={["Nombre", "Email", "Acciones"]}
            data={clients ? clients.map((c) => [
             
              c.name,
              c.email,
             
              <ButtonGroup size="sm" key={c.id}> 
                <Button 
                  variant="outline-primary"
                  onClick={() => handleShowModal(c)} 
                >
                  Editar
                </Button>
                <Button 
                  variant="outline-danger" 
                  onClick={() => handleDelete(c.id, c.name)}
                >
                  Borrar
                </Button>
              </ButtonGroup>
            ]) : []}
          />
        </div>
      </div>

      
     <ClientEditModal
        show={showModal}
        handleClose={handleCloseModal}
        client={selectedClient}
        
        onUpdated={handleClientUpdated}
      />
    </>
  );
}
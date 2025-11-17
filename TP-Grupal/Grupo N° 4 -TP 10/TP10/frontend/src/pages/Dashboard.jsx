
import React from 'react';
import { Card, Row, Col, ProgressBar, Spinner, Alert } from 'react-bootstrap';
import "../styles/dashboard.css";


import { useApi } from '../hooks/useApi';
import { getClients } from '../services/clientService';
import { getServices } from '../services/hairServiceAPI';
import { getAllAppointments } from '../services/appointmentService';

export default function Dashboard() {
 
 
 const { data: clients, loading: loadingClients, error: errorClients } = useApi(getClients);
 const { data: services, loading: loadingServices, error: errorServices } = useApi(getServices);
 const { data: appointments, loading: loadingApp, error: errorApp } = useApi(getAllAppointments);
 


 const isLoading = loadingClients || loadingServices || loadingApp;
 const apiError = errorClients || errorServices || errorApp; // Toma el primer error que ocurra

 if (isLoading) {
 return (
 <div className="text-center mt-5">
 <Spinner animation="border" variant="primary" />
 <p className="mt-2 text-muted">Cargando datos del dashboard...</p>
 </div>
 );
 }


 if (apiError) {
return <Alert variant="danger">Error al cargar el dashboard: {apiError.message}</Alert>;
 }


 const totalClients = clients?.length ?? 0;
 const totalServices = services?.length ?? 0;
 const totalAppointments = appointments?.length ?? 0;

 return (
 <div className="dashboard-container">
 <h3 className="mb-4 fw-bold">Dashboard General</h3>

 <Row className="g-3 mb-4">

 <Col md={4}>
 <Card className="stat-box">
 <Card.Body>
 <h6 className="stat-title">Total Clientes</h6>
<h2 className="stat-value">{totalClients}</h2>
 <ProgressBar now={totalClients} variant="info" className="stat-bar" />
 </Card.Body>
</Card>
</Col>

 <Col md={4}>
<Card className="stat-box">
 <Card.Body>
<h6 className="stat-title">Total Turnos</h6>
<h2 className="stat-value">{totalAppointments}</h2>
<ProgressBar now={totalAppointments} variant="warning" className="stat-bar" />
</Card.Body>
 </Card>
 </Col>

 <Col md={4}>
 <Card className="stat-box">
<Card.Body>
 <h6 className="stat-title">Total Servicios</h6>
 <h2 className="stat-value">{totalServices}</h2>
 <ProgressBar now={totalServices} variant="primary" className="stat-bar" />
</Card.Body>
 </Card>
</Col>
 </Row>

 <Card className="summary-card">
 <Card.Body>
<Card.Title>Resumen del Sistema</Card.Title>
<p>
Actualmente, el sistema gestiona <strong>{totalClients} clientes</strong> y 
<strong> {totalServices} servicios</strong>.
 Se han registrado un total de <strong>{totalAppointments} turnos</strong>.
</p>
 </Card.Body>
 </Card>
 </div>
);
}
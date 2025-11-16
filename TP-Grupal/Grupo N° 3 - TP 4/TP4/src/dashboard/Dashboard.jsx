import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BookOpen, UserCheck, BookOpenCheck } from 'lucide-react';
import { getBooks, getStudents, getLoans } from '../store/dataService'; // Asumo que estas funciones existen

// Componente para una métrica individual
const MetricCard = ({ title, value, icon: Icon, variant }) => (
    <Card className={`text-center shadow-lg border-${variant} h-100`}>
        <Card.Body>
            <Icon size={32} className={`text-${variant} mb-2`} />
            <Card.Title className="fw-bold text-muted">{title}</Card.Title>
            <Card.Text className={`fw-bold fs-1 text-${variant}`}>{value}</Card.Text>
        </Card.Body>
    </Card>
);

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalLibros: 0,
        librosDisponibles: 0,
        totalAlumnos: 0,
    });

    useEffect(() => {
        // Carga de datos para estadísticas
        const libros = getBooks() || [];
        const alumnos = getStudents() || [];

        const totalLibros = libros.length;
        const librosDisponibles = libros.reduce(
            (acc, l) => acc + (l.cantidadDisponible || 0),
            0
        );
        const totalAlumnos = alumnos.length;

        setStats({
            totalLibros,
            librosDisponibles,
            totalAlumnos,
        });
    }, []);


    return (
        <div className="p-4">
            <h1 className="display-6 fw-bold mb-4">Resumen de la Biblioteca</h1>

            {/* Fila de Métricas Clave */}
            <Row xs={1} md={3} className="g-4 mb-5">
                <Col>
                    <MetricCard 
                        title="Títulos Registrados"
                        value={stats.totalLibros}
                        icon={BookOpen}
                        variant="primary"
                    />
                </Col>
                <Col>
                    <MetricCard 
                        title="Unidades Disponibles"
                        value={stats.librosDisponibles}
                        icon={BookOpenCheck}
                        variant="success"
                    />
                </Col>
                <Col>
                    <MetricCard 
                        title="Alumnos Registrados"
                        value={stats.totalAlumnos}
                        icon={UserCheck}
                        variant="info"
                    />
                </Col>
            </Row>

            {/* Sección de Bienvenida/Instrucciones */}
            <Card className="shadow-lg border-light">
                <Card.Body>
                    <Card.Title className="fs-4">Plataforma de Gestión</Card.Title>
                    <Card.Text className="lead text-muted">
                        Utiliza el **Panel de Biblioteca** en el lateral izquierdo para acceder a las secciones de gestión:
                    </Card.Text>
                    <ul>
                        <li>**Libros:** Para registrar, editar y consultar el inventario de la colección.</li>
                        <li>**Alumnos:** Para administrar el registro de los estudiantes.</li>
                        <li>**Préstamos:** Para gestionar los préstamos y devoluciones activos.</li>
                    </ul>
                    <Card.Text className="text-sm fst-italic mt-3">
                        Los indicadores de préstamos activos, por vencer y vencidos se muestran en tiempo real en la barra lateral.
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}
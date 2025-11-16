import { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { getCourses, getStudents, getEnrollments } from "../../store/dataService";

export default function DashboardPage() {
    const [stats, setStats] = useState({ cursos: 0, alumnos: 0, inscripciones: 0 });

    useEffect(() => {
        const cursos = getCourses().length;
        const alumnos = getStudents().length;
        const inscripciones = getEnrollments().length;
        setStats({ cursos, alumnos, inscripciones });
    }, []);

    return (
        <>
        <h2>📊 Dashboard</h2>
      <Row className="mt-4">
        <Col>
          <Card bg="primary" text="white" className="text-center">
            <Card.Body>
              <Card.Title>Cursos</Card.Title>
              <Card.Text>{stats.cursos}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="success" text="white" className="text-center">
            <Card.Body>
              <Card.Title>Alumnos</Card.Title>
              <Card.Text>{stats.alumnos}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="warning" text="white" className="text-center">
            <Card.Body>
              <Card.Title>Inscripciones</Card.Title>
              <Card.Text>{stats.inscripciones}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        </>
    );
}
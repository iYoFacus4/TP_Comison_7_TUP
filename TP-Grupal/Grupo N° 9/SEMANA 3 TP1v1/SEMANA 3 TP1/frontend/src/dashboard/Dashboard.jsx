// src/dashboard/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Button } from 'react-bootstrap';
import { useService } from '../hooks/useService';
import { LibrosService } from '../services/libros';
import { AlumnosService } from '../services/alumnos';
import { PrestamosService } from '../services/prestamos';

export default function Dashboard() {
  const libros = useService(LibrosService.list, []);
  const alumnos = useService(AlumnosService.list, []);
  const prestamos = useService(PrestamosService.list, []);

  // Semana 1: ejemplo explícito de useState + useEffect con datos simulados/derivados
  const [agotados, setAgotados] = useState(0);

  useEffect(() => {
    if (Array.isArray(libros.data)) {
      setAgotados(libros.data.filter((l) => l.disponibles === 0).length);
    }
  }, [libros.data]);

  return (
    <div>
      <h1 className="mb-3">Dashboard — Biblioteca</h1>

      <Row className="g-3">
        <Col md={3}>
          <KPI title="Libros" value={libros.loading ? '...' : libros.data.length} />
        </Col>
        <Col md={3}>
          <KPI title="Alumnos" value={alumnos.loading ? '...' : alumnos.data.length} />
        </Col>
        <Col md={3}>
          <KPI title="Préstamos" value={prestamos.loading ? '...' : prestamos.data.length} />
        </Col>
        <Col md={3}>
          <KPI title="Libros agotados" value={libros.loading ? '...' : agotados} />
        </Col>
      </Row>

      <div className="d-flex gap-2 mt-3">
        <Button variant="outline-light" size="sm" onClick={libros.reload}>
          Recargar Libros
        </Button>
        <Button variant="outline-light" size="sm" onClick={alumnos.reload}>
          Recargar Alumnos
        </Button>
        <Button variant="outline-light" size="sm" onClick={prestamos.reload}>
          Recargar Préstamos
        </Button>
      </div>

      <h2 className="mt-4">Libros</h2>
      {libros.loading ? (
        <p>Cargando...</p>
      ) : (
        <Table striped bordered hover variant="dark" responsive className="mt-2">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Disponibles</th>
            </tr>
          </thead>
          <tbody>
            {libros.data.map((l) => (
              <tr key={l.id}>
                <td>{l.titulo}</td>
                <td>{l.autor}</td>
                <td>{l.disponibles}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <Card className="p-3 h-100 shadow-sm">
      <div className="text-secondary">{title}</div>
      <div className="fs-3 fw-bold">{value}</div>
    </Card>
  );
}

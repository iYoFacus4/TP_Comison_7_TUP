// src/pages/Students/StudentsPage.jsx
import React, { useEffect, useState } from "react";
import { getStudents } from "../../store/dataService";
import { Button, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Alumnos registrados</h3>
        <Link to="/students/register">
          <Button>+ Registrar Alumno</Button>
        </Link>
      </div>

      {students.length === 0 ? (
        <p>No hay alumnos registrados.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.nombre}</td>
                <td>{s.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

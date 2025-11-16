import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getStudents } from "../../store/dataService";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(getStudents());
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>👩‍🎓 Alumnos</h2>
        <Button as={Link} to="/students/register" variant="primary">
          ➕ Registrar Alumno
        </Button>
      </div>

      {students.length === 0 ? (
        <p>No hay alumnos registrados.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>
            {students.map((a) => (
              <tr key={a.id}>
                <td>{a.nombre}</td>
                <td>{a.correo}</td>
                <td>{a.dni}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

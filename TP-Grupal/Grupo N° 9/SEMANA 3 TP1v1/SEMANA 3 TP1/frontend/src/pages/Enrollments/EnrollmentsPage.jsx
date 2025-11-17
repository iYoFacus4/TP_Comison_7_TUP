import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEnrollments, getStudents, getCourses } from "../../store/dataService";

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const all = getEnrollments();
    const students = getStudents();
    const courses = getCourses();

    // Mezclar para mostrar nombres
    const joined = all.map((e) => ({
      ...e,
      alumno: students.find((s) => s.id === e.alumnoId)?.nombre || "Desconocido",
      curso: courses.find((c) => c.id === e.cursoId)?.nombre || "Desconocido",
    }));

    setEnrollments(joined);
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📝 Inscripciones</h2>
        <Button as={Link} to="/enrollments/create" variant="primary">
          ➕ Nueva Inscripción
        </Button>
      </div>

      {enrollments.length === 0 ? (
        <p>No hay inscripciones registradas.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Alumno</th>
              <th>Curso</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((i) => (
              <tr key={i.id}>
                <td>{i.alumno}</td>
                <td>{i.curso}</td>
                <td>{i.fecha}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

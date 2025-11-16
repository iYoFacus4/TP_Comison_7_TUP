import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { studentsService } from "../../services/students.service";

/** Alta de alumno (POST /students) */
export default function FormAlumno() {
  const [alumno, setAlumno] = useState({ nombre: "", email: "", dni: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await studentsService.create(alumno);
      setMsg("✅ Alumno registrado correctamente");
      setTimeout(() => navigate("/alumnos"), 800);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <h3>Registrar Alumno</h3>
      {msg && <Alert variant="success">{msg}</Alert>}
      {err && <Alert variant="danger">{err}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            value={alumno.nombre}
            onChange={e=>setAlumno({...alumno, nombre: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={alumno.email}
            onChange={e=>setAlumno({...alumno, email: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>DNI</Form.Label>
          <Form.Control
            type="number"
            value={alumno.dni}
            onChange={e=>setAlumno({...alumno, dni: e.target.value})}
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="success">Guardar</Button>
          <Button variant="secondary" onClick={()=>navigate("/alumnos")}>Cancelar</Button>
        </div>
      </Form>
    </>
  );
}

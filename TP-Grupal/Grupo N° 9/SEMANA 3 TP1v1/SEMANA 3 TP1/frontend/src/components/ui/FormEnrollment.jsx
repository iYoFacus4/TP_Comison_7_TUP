import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { getCourses, getStudents, addEnrollment } from "../../store/dataService";

export default function FormEnrollment() {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ alumnoId: "", cursoId: "" });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    setCourses(getCourses());
    setStudents(getStudents());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.alumnoId || !form.cursoId) {
      setAlert({ type: "danger", text: "Debe seleccionar un alumno y un curso" });
      return;
    }

    const result = addEnrollment(form);
    if (result.success) {
      setAlert({ type: "success", text: "Inscripción registrada correctamente ✅" });
      setForm({ alumnoId: "", cursoId: "" });
    } else {
      setAlert({ type: "danger", text: result.message });
    }
  };

  return (
    <>
      {alert && <AlertMessage type={alert.type} text={alert.text} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Alumno</Form.Label>
          <Form.Select name="alumnoId" value={form.alumnoId} onChange={handleChange}>
            <option value="">Seleccionar...</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Curso</Form.Label>
          <Form.Select name="cursoId" value={form.cursoId} onChange={handleChange}>
            <option value="">Seleccionar...</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar Inscripción
        </Button>
      </Form>
    </>
  );
}

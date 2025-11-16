import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { addCourse } from "../../store/dataService";

export default function FormCourse() {
  const [form, setForm] = useState({ nombre: "", categoria: "", duracion: "", cupo: "" });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.categoria || !form.duracion || !form.cupo) {
      setAlert({ type: "danger", text: "Todos los campos son obligatorios" });
      return;
    }

    const result = addCourse(form);
    if (result.success) {
      setAlert({ type: "success", text: "Curso agregado correctamente ✅" });
      setForm({ nombre: "", categoria: "", duracion: "", cupo: "" });
    } else {
      setAlert({ type: "danger", text: result.message });
    }
  };

  return (
    <>
      {alert && <AlertMessage type={alert.type} text={alert.text} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del curso</Form.Label>
          <Form.Control
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: React desde cero"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            placeholder="Ej: Programación"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duración (hs)</Form.Label>
          <Form.Control
            name="duracion"
            value={form.duracion}
            onChange={handleChange}
            placeholder="Ej: 20"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cupo máximo</Form.Label>
          <Form.Control
            name="cupo"
            value={form.cupo}
            onChange={handleChange}
            placeholder="Ej: 15"
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Guardar Curso
        </Button>
      </Form>
    </>
  );
}
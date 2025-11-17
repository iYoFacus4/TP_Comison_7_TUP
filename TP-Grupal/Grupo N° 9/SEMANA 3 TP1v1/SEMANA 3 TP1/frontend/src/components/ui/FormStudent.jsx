import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import { addStudent } from "../../store/dataService";

export default function FormStudent() {
  const [form, setForm] = useState({ nombre: "", correo: "", dni: "" });
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.correo || !form.dni) {
      setAlert({ type: "danger", text: "Todos los campos son obligatorios" });
      return;
    }

    const result = addStudent(form);
    if (result.success) {
      setAlert({ type: "success", text: "Alumno registrado correctamente ✅" });
      setForm({ nombre: "", correo: "", dni: "" });
    } else {
      setAlert({ type: "danger", text: result.message });
    }
  };

  return (
    <>
      {alert && <AlertMessage type={alert.type} text={alert.text} />}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre completo</Form.Label>
          <Form.Control
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            name="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="Ej: juan@gmail.com"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>DNI</Form.Label>
          <Form.Control
            name="dni"
            value={form.dni}
            onChange={handleChange}
            placeholder="Ej: 40123456"
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Registrar Alumno
        </Button>
      </Form>
    </>
  );
}

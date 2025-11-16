
import React, { useState } from "react";
import { addCourse } from "../../store/dataService";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function CreateCoursePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", cupo: "", descripcion: "" });
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addCourse({ ...form, cupo: Number(form.cupo) });
    if (res.success) {
      setFeedback({ type: "success", message: "Curso creado ✅" });
      setTimeout(() => navigate("/courses"), 800);
    } else {
      setFeedback({ type: "danger", message: res.message || "Error al crear curso" });
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h3>Crear nuevo curso</h3>
      {feedback && <Alert variant={feedback.type}>{feedback.message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="courseName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="courseCupo">
          <Form.Label>Cupo</Form.Label>
          <Form.Control
            name="cupo"
            type="number"
            min="1"
            value={form.cupo}
            onChange={(e) => setForm({ ...form, cupo: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="courseDesc">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </Form.Group>

        <Button type="submit">Guardar</Button>
      </Form>
    </Container>
  );
}

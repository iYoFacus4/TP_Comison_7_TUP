// src/pages/Students/RegisterStudentPage.jsx
import React, { useState } from "react";
import { addStudent } from "../../store/dataService";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function RegisterStudentPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "" });
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addStudent(form);
    if (res.success) {
      setFeedback({ type: "success", message: "Alumno registrado ✅" });
      setTimeout(() => navigate("/students"), 800);
    } else {
      setFeedback({ type: "danger", message: res.message || "Error al registrar alumno" });
    }
  };

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h3>Registrar nuevo alumno</h3>
      {feedback && <Alert variant={feedback.type}>{feedback.message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="studentName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="nombre"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="studentEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </Form.Group>

        <Button type="submit">Guardar</Button>
      </Form>
    </Container>
  );
}

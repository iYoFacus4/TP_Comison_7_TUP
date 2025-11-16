import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { booksService } from "../../services/books.service";

/** Alta de libro (POST /books) */
export default function FormLibro() {
  const [libro, setLibro] = useState({ titulo: "", autor: "", categoria: "", cantidad: 1 });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await booksService.create(libro);
      setMsg("✅ Libro agregado correctamente");
      setTimeout(() => navigate("/libros"), 800);
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    <>
      <h3>Agregar Libro</h3>
      {msg && <Alert variant="success">{msg}</Alert>}
      {err && <Alert variant="danger">{err}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Título</Form.Label>
          <Form.Control
            value={libro.titulo}
            onChange={e=>setLibro({...libro, titulo: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            value={libro.autor}
            onChange={e=>setLibro({...libro, autor: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            value={libro.categoria}
            onChange={e=>setLibro({...libro, categoria: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Cantidad total</Form.Label>
          <Form.Control
            type="number" min="1"
            value={libro.cantidad}
            onChange={e=>setLibro({...libro, cantidad: Number(e.target.value)})}
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="success">Guardar</Button>
          <Button variant="secondary" onClick={()=>navigate("/libros")}>Cancelar</Button>
        </div>
      </Form>
    </>
  );
}


/** ALUMNOS Y PRESTAMOS SIGUEN MOMENTANEAMENTE CON LOCALSTORAGE VIA STORE/DATASERVICE.JS.  */
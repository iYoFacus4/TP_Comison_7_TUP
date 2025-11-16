import { useMemo, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loansService } from "../../services/loans.service";
import { useService } from "../../hooks/useService";
import { booksService } from "../../services/books.service";
import { studentsService } from "../../services/students.service";

/** Alta de préstamo (valida y descuenta stock en el server) */
export default function FormPrestamo() {
  const [prestamo, setPrestamo] = useState({ alumnoId: "", libroId: "", fechaPrestamo: "", fechaDevolucion: "" });
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const { data: alumnos, loading: loadAlu, error: errAlu } = useService({
    request: () => studentsService.getAll(), deps: []
  });
  const { data: libros, loading: loadLib, error: errLib } = useService({
    request: () => booksService.getAll(), deps: []
  });

  const alumnosOpt = useMemo(() => alumnos || [], [alumnos]);
  const librosOpt = useMemo(() => (libros || []).filter(l => (l.cantidadDisponible ?? 0) > 0), [libros]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await loansService.create({
        ...prestamo,
        alumnoId: Number(prestamo.alumnoId),
        libroId: Number(prestamo.libroId),
      });
      setMsg("✅ Préstamo registrado correctamente");
      setTimeout(() => navigate("/prestamos"), 800);
    } catch (error) {
      setErr(error.message);
    }
  };

  if (loadAlu || loadLib) {
    return <div className="text-center py-5"><Spinner animation="border" /></div>;
  }
  if (errAlu || errLib) {
    return <Alert variant="danger">Error cargando datos: {(errAlu?.message || errLib?.message)}</Alert>;
  }

  return (
    <>
      <h3>Registrar Préstamo</h3>
      {msg && <Alert variant="success">{msg}</Alert>}
      {err && <Alert variant="danger">{err}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Alumno</Form.Label>
          <Form.Select
            value={prestamo.alumnoId}
            onChange={e=>setPrestamo({...prestamo, alumnoId: e.target.value})}
            required
          >
            <option value="">Seleccionar...</option>
            {alumnosOpt.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Libro</Form.Label>
          <Form.Select
            value={prestamo.libroId}
            onChange={e=>setPrestamo({...prestamo, libroId: e.target.value})}
            required
          >
            <option value="">Seleccionar...</option>
            {librosOpt.map(l => <option key={l.id} value={l.id}>{l.titulo} (Disp: {l.cantidadDisponible})</option>)}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Fecha préstamo</Form.Label>
          <Form.Control
            type="date"
            value={prestamo.fechaPrestamo}
            onChange={e=>setPrestamo({...prestamo, fechaPrestamo: e.target.value})}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Fecha devolución</Form.Label>
          <Form.Control
            type="date"
            value={prestamo.fechaDevolucion}
            onChange={e=>setPrestamo({...prestamo, fechaDevolucion: e.target.value})}
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button type="submit" variant="success">Guardar</Button>
          <Button variant="secondary" onClick={()=>navigate("/prestamos")}>Cancelar</Button>
        </div>
      </Form>
    </>
  );
}

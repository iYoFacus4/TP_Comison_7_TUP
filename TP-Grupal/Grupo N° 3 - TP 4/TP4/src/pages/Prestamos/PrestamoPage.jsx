import { useEffect, useMemo, useState } from "react";
import { Table, Button, Card, Badge, Row, Col, Form, Alert } from "react-bootstrap";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";
import PaginationControls from "../../components/Pagination";
import { listLoans, returnLoan } from "../../services/loans.service";
import { searchBooks } from "../../services/books.service";
import { searchStudents } from "../../services/students.service";
import { Undo2, Search } from "lucide-react";

const PAGE_SIZE = 10;
const MIN_QUERY = 2;
const DEBOUNCE_MS = 350;

export default function PrestamosPage() {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // filtros (por id seleccionado, no por texto)
  const [bookId, setBookId] = useState(null);
  const [studentId, setStudentId] = useState(null);

  // typeahead / sugerencias
  const [qBook, setQBook] = useState("");
  const [qStudent, setQStudent] = useState("");
  const [bookOptions, setBookOptions] = useState([]);
  const [studentOptions, setStudentOptions] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // devolución
  const [showConfirm, setShowConfirm] = useState(false);
  const [loanToReturn, setLoanToReturn] = useState(null);
  const [msg, setMsg] = useState("");

  async function cargar() {
    setLoading(true);
    setErr("");
    try {
      const { rows, total } = await listLoans({ page, limit: PAGE_SIZE, studentId, bookId });
      setRows(rows);
      setTotal(total);
    } catch {
      setErr("No se pudieron cargar los préstamos");
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { cargar(); }, [page, bookId, studentId]);

  // typeahead libros
  useEffect(() => {
    if (qBook.trim().length < MIN_QUERY) { setBookOptions([]); return; }
    const t = setTimeout(async () => {
      setLoadingBooks(true);
      try {
        const list = await searchBooks(qBook.trim(), 50);
        setBookOptions(list);
      } finally {
        setLoadingBooks(false);
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [qBook]);

  // typeahead alumnos
  useEffect(() => {
    if (qStudent.trim().length < MIN_QUERY) { setStudentOptions([]); return; }
    const t = setTimeout(async () => {
      setLoadingStudents(true);
      try {
        const list = await searchStudents(qStudent.trim(), 50);
        setStudentOptions(list);
      } finally {
        setLoadingStudents(false);
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [qStudent]);

  // helpers visuales
  const getDaysLeft = (fechaDevolucion) => {
    const hoy = new Date();
    const devolucion = new Date(fechaDevolucion);
    const diff = Math.ceil((devolucion - hoy) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };
  const getLoanStatus = (daysLeft) => {
    if (daysLeft <= 0) return { text: "Vencido", color: "danger" };
    if (daysLeft <= 2) return { text: "Por vencer", color: "warning" };
    return { text: "Activo", color: "success" };
  };

  const onAskReturn = (loan) => {
    setLoanToReturn(loan);
    setShowConfirm(true);
  };
  const onConfirmReturn = async () => {
    try {
      await returnLoan(loanToReturn.id);
      setMsg("✅ Préstamo devuelto correctamente");
      // ajustar página si queda vacía
      const nextTotal = total - 1;
      const lastPage = Math.max(1, Math.ceil(nextTotal / PAGE_SIZE));
      if (page > lastPage) setPage(lastPage);
      else cargar();
    } catch {
      setErr("No se pudo registrar la devolución");
    } finally {
      setShowConfirm(false);
      setLoanToReturn(null);
    }
  };

  const clearBookFilter = () => { setBookId(null); setQBook(""); setBookOptions([]); setPage(1); };
  const clearStudentFilter = () => { setStudentId(null); setQStudent(""); setStudentOptions([]); setPage(1); };

  if (loading) return <Loader label="Cargando préstamos..." />;

  return (
    <Card className="shadow-sm p-3">
      <h4 className="mb-3">Préstamos</h4>

      {msg && <Alert variant="success" onClose={()=>setMsg("")} dismissible>{msg}</Alert>}
      {err && <Alert variant="danger" onClose={()=>setErr("")} dismissible>{err}</Alert>}

      {/* Filtros livianos */}
      <Row className="g-2 align-items-end mb-3">
        <Col md={5}>
          <Form.Label>Libro (título/autor)</Form.Label>
          <div className="d-flex gap-2">
            <div className="flex-grow-1 position-relative">
              <Form.Control
                placeholder="Escribí al menos 2 letras..."
                value={qBook}
                onChange={(e)=>{ setQBook(e.target.value); }}
              />
              {/* Sugerencias */}
              {bookOptions.length > 0 && (
                <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 3, maxHeight: 260, overflow: "auto" }}>
                  {bookOptions.map(b=>(
                    <div
                      key={b.id}
                      className="px-2 py-1 hover-bg"
                      role="button"
                      onClick={()=>{ setBookId(b.id); setQBook(`${b.titulo} — ${b.autor || ""}`); setBookOptions([]); setPage(1); }}
                    >
                      <small>{b.titulo}{b.autor ? ` — ${b.autor}` : ""}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button variant="outline-secondary" onClick={clearBookFilter}>Limpiar</Button>
          </div>
          {loadingBooks && <small className="text-muted">Buscando libros…</small>}
        </Col>

        <Col md={5}>
          <Form.Label>Alumno (nombre/DNI)</Form.Label>
          <div className="d-flex gap-2">
            <div className="flex-grow-1 position-relative">
              <Form.Control
                placeholder="Escribí al menos 2 letras..."
                value={qStudent}
                onChange={(e)=>{ setQStudent(e.target.value); }}
              />
              {/* Sugerencias */}
              {studentOptions.length > 0 && (
                <div className="position-absolute w-100 bg-white border rounded mt-1 shadow-sm" style={{ zIndex: 3, maxHeight: 260, overflow: "auto" }}>
                  {studentOptions.map(s=>(
                    <div
                      key={s.id}
                      className="px-2 py-1 hover-bg"
                      role="button"
                      onClick={()=>{ setStudentId(s.id); setQStudent(`${s.nombre} ${s.apellido || ""} — ${s.dni || ""}`); setStudentOptions([]); setPage(1); }}
                    >
                      <small>{s.nombre} {s.apellido} {s.dni ? `— ${s.dni}` : ""}</small>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Button variant="outline-secondary" onClick={clearStudentFilter}>Limpiar</Button>
          </div>
          {loadingStudents && <small className="text-muted">Buscando alumnos…</small>}
        </Col>

        <Col md={2}>
          <Button className="w-100 btn-hl2" onClick={()=>setPage(1)}>
            <Search size={16} className="me-1" /> Buscar
          </Button>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">Total: {total}</small>
        <PaginationControls page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Alumno</th>
            <th>Libro</th>
            <th>Fecha préstamo</th>
            <th>Devolución</th>
            <th>Días</th>
            <th>Estado</th>
            <th style={{ width: 130 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => {
            const daysLeft = getDaysLeft(p.fechaDevolucion);
            const estado = getLoanStatus(daysLeft);
            const alumno = p.student?.nombre || p.alumno || p.alumnoId;
            const libro = p.book?.titulo || p.libro || p.libroId;
            return (
              <tr key={p.id}>
                <td>{alumno}</td>
                <td>{libro}</td>
                <td className="text-center">{p.fechaPrestamo}</td>
                <td className="text-center">{p.fechaDevolucion}</td>
                <td className="text-center fw-bold">{daysLeft > 0 ? `${daysLeft}` : "0"}</td>
                <td className="text-center"><Badge bg={estado.color}>{estado.text}</Badge></td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="outline-success"
                    onClick={()=>onAskReturn(p)}
                    title="Registrar devolución"
                  >
                    <Undo2 size={14} className="me-1" /> Devolver
                  </Button>
                </td>
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr><td colSpan={7} className="text-center text-muted py-4">Sin resultados.</td></tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-2">
        <PaginationControls page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
      </div>

      <ConfirmModal
        show={showConfirm}
        title="Registrar devolución"
        message={`¿Confirmás la devolución del préstamo #${loanToReturn?.id || ""}?`}
        confirmText="Confirmar devolución"
        confirmVariant="success"
        onConfirm={onConfirmReturn}
        onCancel={()=>{ setShowConfirm(false); setLoanToReturn(null); }}
      />
    </Card>
  );
}

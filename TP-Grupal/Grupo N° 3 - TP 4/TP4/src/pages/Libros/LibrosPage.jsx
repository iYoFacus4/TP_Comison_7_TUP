import { useEffect, useMemo, useState } from "react";
import { Table, Button, Card, Form, Row, Col, Alert } from "react-bootstrap";
import { booksService } from "../../services/books.service";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";
import PaginationControls from "../../components/Pagination";
import { Pencil, Trash2, BookPlus } from "lucide-react";

const PAGE_SIZE = 8;

export default function LibrosPage(){
  const [libros,setLibros] = useState([]);
  const [loading,setLoading] = useState(true);
 const [form,setForm] = useState({ titulo:"", autor:"", categoria:"", cantidad:0, cantidadDisponible:0 });
  const [editing,setEditing] = useState(null);
  const [msg,setMsg] = useState("");
  const [error,setError] = useState("");
  const [page, setPage] = useState(1);

  // Modal de confirmación
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  async function cargar(){
    setLoading(true);
    setError("");
    try{
      const data = await booksService.getAll();
      setLibros(data);
    }catch(err){
      setError("No se pudieron cargar los libros");
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{ cargar(); },[]);

  const onSubmit = async(e)=>{
    e.preventDefault();
    setMsg(""); setError("");

    if(!form.titulo || !form.autor){
      setError("Completá Título y Autor");
      return;
    }
    try{
      if(editing){
        await booksService.update(editing, { ...form, cantidad: Number(form.cantidad || 0) });
        setMsg("Libro actualizado correctamente");
      }else{
       await booksService.create({ ...form, cantidad: Number(form.cantidad||0), cantidadDisponible: Number(form.cantidadDisponible||0) });
        setMsg("Libro creado correctamente");
        setPage(1); // volver a la primera página para ver el nuevo
      }
      setForm({ titulo:"", autor:"", cantidad:0 });
      setEditing(null);
      cargar();
    }catch{
      setError("Ocurrió un error al guardar");
    }
  };

  const onEdit = (l)=>{
    setEditing(l.id);
    setForm({ titulo:l.titulo ?? "", autor:l.autor ?? "", cantidad:l.cantidad ?? 0 });
  };

  const onAskDelete = (id)=>{
    setToDelete(id);
    setShowConfirm(true);
  };

  const onConfirmDelete = async()=>{
    if(!toDelete) return;
    try{
      await booksService.delete(toDelete);
      setMsg("Libro eliminado");
      // si al eliminar quedamos en una página vacía, retroceder una
      const nextTotal = libros.length - 1;
      const lastPage = Math.max(1, Math.ceil(nextTotal / PAGE_SIZE));
      if(page > lastPage) setPage(lastPage);
      cargar();
    }catch{
      setError("No se pudo eliminar el libro");
    }finally{
      setShowConfirm(false);
      setToDelete(null);
    }
  };

  const onCancelDelete = ()=>{
    setShowConfirm(false);
    setToDelete(null);
  };

  // Paginación
  const total = libros.length;
  const dataPage = useMemo(()=>{
    const start = (page - 1) * PAGE_SIZE;
    return libros.slice(start, start + PAGE_SIZE);
  },[libros, page]);

  if(loading) return <Loader label="Cargando libros..." />;

  return(
    <Card className="shadow-sm p-3">
      <h4 className="mb-3">Gestión de Libros</h4>

      {msg && <Alert variant="success" onClose={()=>setMsg("")} dismissible>{msg}</Alert>}
      {error && <Alert variant="danger" onClose={()=>setError("")} dismissible>{error}</Alert>}

      <Form onSubmit={onSubmit} className="mb-3">
        <Row className="g-2">
          <Col md={4}>
            <Form.Control
              placeholder="Título"
              value={form.titulo}
              onChange={e=>setForm({...form,titulo:e.target.value})}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Autor"
              value={form.autor}
              onChange={e=>setForm({...form,autor:e.target.value})}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              min="0"
              placeholder="Cant."
              value={form.cantidad}
              onChange={e=>setForm({...form,cantidad:e.target.value})}
            />
          </Col>
          <Col md={3}><Form.Control placeholder="Categoría" value={form.categoria} onChange={e=>setForm({...form,categoria:e.target.value})}/></Col>
          <Col md={2}><Form.Control type="number" min="0" placeholder="Disp." value={form.cantidadDisponible} onChange={e=>setForm({...form,cantidadDisponible:e.target.value})}/></Col>
          <Col md={2}>
            <Button type="submit" className="w-100 btn-hl2">
              {editing ? "Actualizar" : "Agregar"} <BookPlus size={16} className="ms-1"/>
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="d-flex justify-content-between align-items-center mb-2">
        <small className="text-muted">Total: {total}</small>
        <PaginationControls page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr><th>Título</th><th>Autor</th><th>Cantidad</th><th>Categoria</th><th>Cantidad Disponible</th><th style={{width: 140}}>Acciones</th></tr>
        </thead>
        <tbody>
          {dataPage.map(l=>(
            <tr key={l.id}>
              <td>{l.titulo}</td>
              <td>{l.autor}</td>
              <td>{l.cantidad}</td>
              <td className="text-center">
                <Button variant="outline-primary" size="sm" onClick={()=>onEdit(l)}><Pencil size={14}/></Button>{" "}
                <Button variant="outline-danger" size="sm" onClick={()=>onAskDelete(l.id)}><Trash2 size={14}/></Button>
              </td>
            </tr>
          ))}
          {dataPage.length === 0 && (
            <tr><td colSpan={4} className="text-center text-muted py-4">Sin resultados en esta página.</td></tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-end mt-2">
        <PaginationControls page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
      </div>

      {/* Modal de confirmación */}
      <ConfirmModal
        show={showConfirm}
        title="Eliminar libro"
        message="¿Seguro que deseas eliminar este libro? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        confirmVariant="danger"
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </Card>
  );
}

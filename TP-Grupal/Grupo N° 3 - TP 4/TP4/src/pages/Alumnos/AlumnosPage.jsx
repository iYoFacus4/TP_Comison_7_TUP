import { useEffect, useMemo, useState } from "react";
import { Table, Button, Card, Form, Row, Col, Alert } from "react-bootstrap";
import { studentsService } from "../../services/students.service";
import Loader from "../../components/Loader";
import ConfirmModal from "../../components/ConfirmModal";
import PaginationControls from "../../components/Pagination";
import { Pencil, Trash2, UserPlus } from "lucide-react";

const PAGE_SIZE = 8;

export default function AlumnosPage(){
  const [alumnos,setAlumnos] = useState([]);
  const [loading,setLoading] = useState(true);
  const [form,setForm] = useState({ nombre:"", apellido:"", dni:"", email:"", telefono:"" });
  const [editing,setEditing] = useState(null);
  const [msg,setMsg] = useState("");
  const [error,setError] = useState("");
  const [page, setPage] = useState(1);

  // Modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  async function cargar(){
    setLoading(true);
    setError("");
    try{
      const data = await studentsService.getAll();
      setAlumnos(data);
    }catch{
      setError("No se pudieron cargar los alumnos");
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{ cargar(); },[]);

  const onSubmit = async(e)=>{
    e.preventDefault();
    setMsg(""); setError("");

    if(!form.nombre || !form.apellido || !form.dni){
      setError("Completá Nombre, Apellido y DNI");
      return;
    }
    try{
      if(editing){
        await studentsService.update(editing, form);
        setMsg("Alumno actualizado");
      }else{
        await studentsService.create(form);
        setMsg("Alumno agregado");
        setPage(1);
      }
      setForm({ nombre:"", apellido:"", dni:"" });
      setEditing(null);
      cargar();
    }catch{
      setError("Ocurrió un error al guardar");
    }
  };

  const onEdit = (a)=>{
    setEditing(a.id);
    setForm({ nombre:a.nombre ?? "", apellido:a.apellido ?? "", dni:a.dni ?? "" });
  };

  const onAskDelete = (id)=>{
    setToDelete(id);
    setShowConfirm(true);
  };

  const onConfirmDelete = async()=>{
    if(!toDelete) return;
    try{
      await studentsService.delete(toDelete);
      setMsg("Alumno eliminado");
      const nextTotal = alumnos.length - 1;
      const lastPage = Math.max(1, Math.ceil(nextTotal / PAGE_SIZE));
      if(page > lastPage) setPage(lastPage);
      cargar();
    }catch{
      setError("No se pudo eliminar el alumno");
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
  const total = alumnos.length;
  const dataPage = useMemo(()=>{
    const start = (page - 1) * PAGE_SIZE;
    return alumnos.slice(start, start + PAGE_SIZE);
  },[alumnos, page]);

  if(loading) return <Loader label="Cargando alumnos..." />;

  return(
    <Card className="shadow-sm p-3">
      <h4 className="mb-3">Gestión de Alumnos</h4>

      {msg && <Alert variant="success" onClose={()=>setMsg("")} dismissible>{msg}</Alert>}
      {error && <Alert variant="danger" onClose={()=>setError("")} dismissible>{error}</Alert>}

      <Form onSubmit={onSubmit} className="mb-3">
        <Row className="g-2">
          <Col md={4}>
            <Form.Control
              placeholder="Nombre"
              value={form.nombre}
              onChange={e=>setForm({...form,nombre:e.target.value})}
            />
          </Col>
          <Col md={4}>
            <Form.Control
              placeholder="Apellido"
              value={form.apellido}
              onChange={e=>setForm({...form,apellido:e.target.value})}
            />
          </Col>
          <Col md={2}>
            <Form.Control
              placeholder="DNI"
              value={form.dni}
              onChange={e=>setForm({...form,dni:e.target.value})}
            />
          </Col>
          <Col md={3}><Form.Control type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></Col>
          <Col md={2}><Form.Control placeholder="Teléfono" value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})}/></Col>
          <Col md={2}>
            <Button type="submit" className="w-100 btn-hl2">
              {editing ? "Actualizar" : "Agregar"} <UserPlus size={16} className="ms-1"/>
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
          <tr><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Email</th><th>Telefono</th><th style={{width: 140}}>Acciones</th></tr>
        </thead>
        <tbody>
          {dataPage.map(a=>(
            <tr key={a.id}>
              <td>{a.nombre}</td>
              <td>{a.apellido}</td>
              <td>{a.dni}</td>
              <td className="text-center">
                <Button variant="outline-primary" size="sm" onClick={()=>onEdit(a)}><Pencil size={14}/></Button>{" "}
                <Button variant="outline-danger" size="sm" onClick={()=>onAskDelete(a.id)}><Trash2 size={14}/></Button>
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
        title="Eliminar alumno"
        message="¿Seguro que deseas eliminar este alumno?"
        confirmText="Eliminar"
        confirmVariant="danger"
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />
    </Card>
  );
}

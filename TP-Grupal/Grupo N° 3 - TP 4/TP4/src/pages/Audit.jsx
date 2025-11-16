import { useEffect, useState } from "react";
import { Card, Table, Badge, Button } from "react-bootstrap"; // 👈 importa Button
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Si ya tenés API_URL/ENDPOINTS y httpClient, usalos.
// Para que funcione out-of-the-box, dejo una base local por defecto:
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const PAGE_SIZE = 10;

export default function Audit() {
  const nav = useNavigate();
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function load() {
    setLoading(true);
    setErr("");
    try {
      const params = new URLSearchParams();
      params.set("_sort", "id");
      params.set("_order", "desc");
      params.set("_page", page);
      params.set("_limit", PAGE_SIZE);

      const res = await fetch(`${API_BASE}/audit?${params.toString()}`);
      const totalCount = Number(res.headers.get("X-Total-Count") || "0");
      const data = await res.json();
      setRows(data);
      setTotal(totalCount);
    } catch (e) {
      setErr("No se pudo cargar la auditoría");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <Card className="shadow-sm p-3">
      {/* Botón Volver */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="outline-secondary" onClick={() => nav(-1)}>
          <ArrowLeft size={16} className="me-1" />
          Volver
        </Button>
        <h5 className="m-0">Auditoría</h5>
        <div />
      </div>

      {err && <div className="alert alert-danger">{err}</div>}
      {loading ? (
        <div className="text-muted">Cargando…</div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Actor</th>
                <th>Acción</th>
                <th>Entidad</th>
                <th>Entidad ID</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="text-center">{r.id}</td>
                  <td>{r.actor || "-"}</td>
                  <td className="text-center">
                    <Badge bg={badgeByAction(r.accion)}>{r.accion}</Badge>
                  </td>
                  <td>{r.entidad || r.entity || "-"}</td>
                  <td className="text-center">{r.entidadId ?? r.entityId ?? "-"}</td>
                  <td className="text-nowrap">{formatTs(r.timestamp)}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Sin registros.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Paginación simple */}
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Total: {total} • Página {page} de {totalPages}
            </small>
            <div className="d-flex gap-2">
              <Button size="sm" variant="secondary" onClick={prevPage} disabled={page <= 1}>
                Anterior
              </Button>
              <Button size="sm" variant="secondary" onClick={nextPage} disabled={page >= totalPages}>
                Siguiente
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

function badgeByAction(a) {
  const x = String(a || "").toUpperCase();
  if (x === "CREATE") return "success";
  if (x === "UPDATE") return "warning";
  if (x === "DELETE") return "danger";
  if (x === "RETURN") return "info";
  if (x === "SEED") return "secondary";
  return "primary";
}

function formatTs(ts) {
  if (!ts) return "-";
  try {
    // Soporta "2025-10-31" y "2025-10-31T10:00:00Z"
    const d = new Date(ts);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
  } catch {
    return ts;
  }
}

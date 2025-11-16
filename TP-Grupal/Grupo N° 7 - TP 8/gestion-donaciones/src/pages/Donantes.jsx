import { useState, useEffect } from "react";
import { Table, Badge } from "react-bootstrap";

export default function Donantes() {
  const [donantes, setDonantes] = useState([]);

  useEffect(() => {
    const data = [
      { id: 1, nombre: "Laura Pérez", email: "laura@gmail.com", monto: 5000, activo: true },
      { id: 2, nombre: "Carlos López", email: "carlos@gmail.com", monto: 2500, activo: false },
      { id: 3, nombre: "María Torres", email: "maria@gmail.com", monto: 10000, activo: true },
      { id: 4, nombre: "Agustin Berenguel", email: "berenguel@gmail.com", monto: 6000, activo: true },
      { id: 5, nombre: "Mateo Avila", email: "avila@gmail.com", monto: 2500, activo: false },
      { id: 6, nombre: "Agustin Monters", email: "agustin@gmail.com", monto: 10000, activo: true },
    ];
    setDonantes(data);
  }, []);

  return (
    <div className="container mt-4">
      {/* Título estilo card */}
      <h2 className="mb-4 fw-bold text-center text-white py-3 rounded shadow" 
          style={{ backgroundColor: "#0d6efd", fontSize: "1.8rem" }}>
        Listado de Donantes
      </h2>

      <Table
        striped
        hover
        responsive
        className="shadow-sm rounded border"
        style={{ backgroundColor: "#ffffff" }}
      >
        <thead className="text-center" style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Monto Donado</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {donantes.map((d, idx) => (
            <tr
              key={d.id}
              className="align-middle text-center"
              style={{
                backgroundColor: idx % 2 === 0 ? "#e9f2ff" : "#ffffff",
                transition: "all 0.2s",
              }}
            >
              <td>{d.id}</td>
              <td className="fw-semibold">{d.nombre}</td>
              <td>{d.email}</td>
              <td className="fw-bold text-primary">${d.monto.toLocaleString()}</td>
              <td>
                <Badge
                  bg={d.activo ? "success" : "warning"}
                  className="px-3 py-2"
                  style={{ fontSize: "0.95rem" }}
                >
                  {d.activo ? "Activo" : "Inactivo"}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

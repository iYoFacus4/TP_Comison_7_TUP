import React from "react";
import { Table, Card } from "react-bootstrap";
export default function DataTable({ rows=[] }){
  return (
    <Card className="shadow-sm">
      <Table responsive hover className="mb-0">
        <thead><tr><th>#</th><th>Nombre</th><th>Email</th><th>Rol</th></tr></thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={r.id??i}>
              <td>{r.id??i+1}</td><td>{r.name}</td><td>{r.email}</td><td>{r.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

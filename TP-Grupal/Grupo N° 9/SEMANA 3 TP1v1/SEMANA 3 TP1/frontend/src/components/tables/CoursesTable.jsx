import React from "react";
import { Table } from "react-bootstrap";

export default function CoursesTable({ courses = [] }) {
  return (
    <Table striped bordered hover>
      <thead><tr><th>ID</th><th>Nombre</th><th>Categoría</th><th>Duración</th></tr></thead>
      <tbody>
        {courses.map(c => (
          <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.category}</td><td>{c.duration}</td></tr>
        ))}
      </tbody>
    </Table>
  );
}

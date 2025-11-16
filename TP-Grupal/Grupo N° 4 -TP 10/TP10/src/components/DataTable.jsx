import Table from "react-bootstrap/Table";
import "../styles/table.css";

export default function DataTable({ columns, data }) {
  return (
    <Table responsive bordered hover className="custom-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center text-muted py-3">
              No hay datos disponibles
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
}


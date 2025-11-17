
import { Table, Button } from 'react-bootstrap';

function TablaComponent({ 
  datos, 
  columnas, 
  onVerDetalle, 
  onEliminar 
}) {
  return (
    <Table striped bordered hover variant="light" responsive>
      <thead>
        <tr>
          <th>#</th>
          {columnas.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            
            {columnas.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render ? col.render(item) : item[col.field]}
              </td>
            ))}
            
            <td>
              {onVerDetalle && (
                <Button 
                  variant="info" 
                  size="sm" 
                  className="me-2"
                  onClick={() => onVerDetalle(item)}
                >
                  Ver Detalle
                </Button>
              )}
              {onEliminar && (
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => onEliminar(item)}
                >
                  Eliminar
                </Button>
              )}
            </td>
          </tr>
        ))}
        {datos.length === 0 && (
          <tr>
            <td colSpan={columnas.length + 2} className="text-center text-muted">
              No hay datos para mostrar.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default TablaComponent;
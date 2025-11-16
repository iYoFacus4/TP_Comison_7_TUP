import React from "react";
import { Table, Badge } from "react-bootstrap";


const TablaUser = ({ usuarios }) => {


    return (
        <Table striped bordered hover responsive className="shadow-sm">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Plan Contratado</th>
                    <th>Estado</th>
                 </tr>
            </thead>

            <tbody>
                {usuarios.map((usuario) => (
                    <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.name}</td>
                        <td>{usuario.plan}</td>
                        <td>
                    <Badge bg={usuario.status === 'Activo' ? 'success' : 'danger'}>
                        {usuario.status}
                    </Badge>
                    </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default TablaUser;
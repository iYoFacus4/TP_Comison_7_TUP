import Table from 'react-bootstrap/Table';
import { useEstudios } from '../../../hook/useEstudios';
import { FaEdit,FaEye } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from 'react-router-dom';


const TablaEstudios = () => {
const { estudios,setEstudios,getEstudioId,crearEstudio,
        editarEstudio,eliminarEstudio,getEstudioById,loading,setLoading } = useEstudios();   


const handleEliminar = async (id) => {
    await eliminarEstudio(id);
}

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>N°</th>
          <th>Titulo</th>
          <th>Descripcion</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudios.map((estudio) => (
        <tr key={estudio.id}>
          <td>{estudio.id}</td>
          <td>{estudio.titulo}</td>
          <td>{estudio.descripcion}</td>
          <td>{estudio.fecha}</td>
            <td>
                <Link to={`/login/estudios/ver/${estudio.id}`}><FaEye /></Link>
                <Link to={`/login/estudios/editar/${estudio.id}`}><FaEdit /></Link>
                <button onClick={() => handleEliminar(estudio.id)}><MdDeleteForever /></button>
            </td>
        </tr>
        ))}
      </tbody>
        
    </Table>
  );
}

export default TablaEstudios;
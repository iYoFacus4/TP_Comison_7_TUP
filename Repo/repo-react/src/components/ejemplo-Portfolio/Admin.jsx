import TablaEstudios from "./Estudios/TablaEstudios";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { ESTUDIOS_CREAR } from "../../routers/estudios.routes";
const Admin = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2>Admin Panel</h2>    
              <Button variant="primary" onClick={()=>navigate(ESTUDIOS_CREAR)}>Crear Estudio</Button>
              <br />
            <TablaEstudios />
        </div>
    )
}
export default Admin

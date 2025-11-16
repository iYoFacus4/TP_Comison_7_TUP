
import { Outlet, useNavigate } from 'react-router-dom'; 
import Sidebar from '../components/Sidebar';
import "../styles/layout.css"; 

export default function MainLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLogged'); 
    navigate('/'); 
  };

  return (
    <div className="layout-container">
      
      <Sidebar /> 
      
      <div className="layout-content">
        <div className="d-flex justify-content-end mb-3">
          
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
        
       
        <Outlet />
      </div>
    </div>
  );
}
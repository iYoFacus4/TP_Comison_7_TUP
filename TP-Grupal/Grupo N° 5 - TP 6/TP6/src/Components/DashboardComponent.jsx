import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
import { getAll, getById, addItem, deleteById } from "../Utils/utils";

function DashboardComponent() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);
    console.table(getAll("personas"))
    const handleCerrarSesion = () => {
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('emailUsuario');
        navigate('/login');
    }

    const handleNavigate = (path, id) => {
        setActiveItem(id);
        navigate(path);
    }

    const menu = [
        { id: 1, title: "EVENTOS", path: '/dashboard/eventos' },
        { id: 2, title: "ARTISTAS", path: '/dashboard/artistas' },
        { id: 3, title: "ASISTENTES", path: '/dashboard/asistentes' }
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
            
            
            <div style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h2 style={{ 
                        marginBottom: '30px', 
                        fontSize: '24px',
                        borderBottom: '2px solid #34495e',
                        paddingBottom: '15px'
                    }}>
                        Gestión
                    </h2>
                    
                    <div>
                        {menu.map((item) => (
                            <div 
                                key={item.id}
                                onClick={() => handleNavigate(item.path, item.id)}
                                style={{
                                    padding: '15px 10px',
                                    marginBottom: '10px',
                                    cursor: 'pointer',
                                    backgroundColor: activeItem === item.id ? '#34495e' : 'transparent',
                                    borderRadius: '5px',
                                    transition: 'all 0.3s',
                                    fontWeight: '500'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeItem !== item.id) e.target.style.backgroundColor = '#34495e';
                                }}
                                onMouseLeave={(e) => {
                                    if (activeItem !== item.id) e.target.style.backgroundColor = 'transparent';
                                }}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleCerrarSesion}
                    style={{
                        padding: '12px',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                    }}
                >
                    CERRAR SESIÓN
                </button>
            </div>

            
            <div style={{
                flex: 1,
                padding: '50px',
                backgroundColor: '#ecf0f1'
            }}>
                <Outlet /> 
            </div>
        </div>
    );
}

export default DashboardComponent;

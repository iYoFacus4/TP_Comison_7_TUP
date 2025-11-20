import { useNavigate, Outlet } from "react-router-dom";
import { useState } from "react";
//import { getAll, getById, addItem, deleteById } from "../Utils/utils";
import { useAuthStore } from '../Store/authStore';

function DashboardComponent() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);
    //console.table(getAll("personas"))
    const logout = useAuthStore((state) => state.logout);

    const handleCerrarSesion = () => {
        logout();
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
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            width: "250px",
            background:
              "linear-gradient(to bottom, #1874ddff, #4db7e9ff",
            // --- FIN DEL CAMBIO ---

            backdropFilter: "blur(10px)", // El efecto de desenfoque
            borderRight: "1px solid rgba(134, 136, 127, 1)", // Borde sutil
            borderRadius: "0px 20px 20px 0px",
            color: "white",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              onClick={() => handleNavigate('/dashboard', 1)}
              style={{
                cursor: 'pointer',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "15px",
                marginBottom: "30px",
                borderBottom: "1px solid #ffffffff", // Separador
                paddingBottom: "20px",
              }}
            >
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/ticket.png"
                alt="Logo Eventos"
                style={{
                  width: "40px",
                  height: "40px",
                }}
              />
              <h2
                style={{
                  color: "white",
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                Eventos
              </h2>
            </div>

            <div>
              {menu.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNavigate(item.path, item.id)}
                  style={{
                    padding: "15px 10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    backgroundColor:
                      activeItem === item.id ? "#817979bb" : "transparent",
                    borderRadius: "15px",
                    transition: "all 0.3s",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    if (activeItem !== item.id)
                      e.target.style.backgroundColor = "#9c8c8c9f";
                  }}
                  onMouseLeave={(e) => {
                    if (activeItem !== item.id)
                      e.target.style.backgroundColor = "transparent";
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          {/* --- 5. BOTÓN LOGOUT CON ESTILO DEL LOGIN --- */}
          <button
            onClick={handleCerrarSesion}
            style={{
              padding: "12px",
              // --- Gradiente del login ---
              background: "linear-gradient(90deg, #ff0000b9, #dd4c4cee)",
              // -------------------------
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = 0.8)}
            onMouseLeave={(e) => (e.target.style.opacity = 1)}
          >
            CERRAR SESIÓN
          </button>
        </div>

        {/* --- 6. ÁREA DE CONTENIDO (OUTLET) --- */}
        <div
          style={{
            flex: 1,
            padding: "50px",
            backgroundColor: "#ecf0f1", // Fondo sólido para legibilidad
            overflowY: "auto",
            borderRadius: "20px 0px 0px 20px" , // IMPORTANTE: Permite scroll en el contenido
          }}
        >
          <Outlet />
        </div>
      </div>
    );
}

export default DashboardComponent;

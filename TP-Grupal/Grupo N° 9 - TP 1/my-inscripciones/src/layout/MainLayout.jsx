import { Container, Row, Col } from "react-bootstrap";
import { FaUserGraduate } from "react-icons/fa";
import { jsxDEV } from "react/jsx-dev-runtime";

export default function MainLayout({ children }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "Arial, sans-serif" }}>
      
      {/* Lado izquierdo con icono grande */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(135deg, #6f42c1, #0d6efd)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <FaUserGraduate size={120} style={{ marginBottom: "20px" }} />
        <h1 style={{ fontSize: "2.2rem", fontWeight: "bold" }}>Bienvenido a Gestión de Cursos</h1>
        <p style={{ fontSize: "1rem", maxWidth: "300px", marginTop: "10px" }}>
          Administra estudiantes, cursos y matriculaciones de manera fácil y rápida
        </p>
      </div>

      {/* Lado derecho con formulario */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "3rem 2rem",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  textAlign: "center",
                  transition: "transform 0.3s",
                }}
                className="login-card"
              >
                {children}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </div>
  );
}

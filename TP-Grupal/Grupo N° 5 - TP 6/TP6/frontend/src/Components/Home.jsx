import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();

  const tarjetas = [
    { 
      titulo: "Eventos", 
      texto: "Gestionar fechas, lugares y cupos.", 
      path: "/dashboard/eventos", 
      color: "#1874dd" 
    },
    { 
      titulo: "Artistas", 
      texto: "Administrar artistas y disponibilidad.", 
      path: "/dashboard/artistas", 
      color: "#1874dd"
    },
    { 
      titulo: "Asistentes", 
      texto: "Ver y administrar los asistentes inscritos.", 
      path: "/dashboard/asistentes", 
      color: "#1874dd"
    }
  ];

  // Estilos para que la tarjeta sea "apretable"
  const cardStyle = {
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
  };

  return (
    <Container fluid>
      <h1 style={{ color: '#2c3e50', marginBottom: '30px' }}>Bienvenido al Panel de Gestión</h1>
      <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '40px' }}>
        Selecciona una de las siguientes opciones para comenzar a administrar:
      </p>
      
      <Row>
        {tarjetas.map((tarjeta) => (
          <Col md={4} key={tarjeta.titulo} className="mb-4">
            <Card 
              className="shadow-sm h-100" 
              onClick={() => navigate(tarjeta.path)}
              style={cardStyle}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Card.Body className="d-flex flex-column justify-content-between text-center p-4">
                <div>
                  <i className={tarjeta.icon} style={{ fontSize: '3.5rem', color: tarjeta.color }}></i>
                  <Card.Title as="h3" className="my-3" style={{ color: '#2c3e50' }}>
                    {tarjeta.titulo}
                  </Card.Title>
                  <Card.Text style={{ color: '#7f8c8d' }}>
                    {tarjeta.texto}
                  </Card.Text>
                </div>
                <Button variant="primary" className="mt-4" style={{ background: 'linear-gradient(90deg, #3a98c4ff, #1874ddff)', border: 'none' }}>
                  Ir a {tarjeta.titulo}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
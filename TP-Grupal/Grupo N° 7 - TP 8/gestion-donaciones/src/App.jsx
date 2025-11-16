import { Container, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import './Styles/Style.css';


export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Gestión de Donaciones</Navbar.Brand>
          {user && (
            <Navbar.Text className="text-light">
              Bienvenido, <strong>{user.name}</strong>
            </Navbar.Text>
            
          )}
        
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Outlet />
      </Container>
    </>
  );
}

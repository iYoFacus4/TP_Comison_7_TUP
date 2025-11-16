import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import { Container, Row, Col } from "react-bootstrap";

export default function AdminLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container fluid>
        <Row>
          <Col xs={2} className="bg-light vh-100 p-0">
            <Sidebar />
          </Col>
          <Col xs={10} className="p-4">
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

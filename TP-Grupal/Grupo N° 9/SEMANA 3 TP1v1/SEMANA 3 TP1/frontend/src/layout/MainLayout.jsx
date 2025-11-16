import Navbar from "../components/ui/Navbar";
import { Container } from "react-bootstrap";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container className="mt-5">{children}</Container>
    </>
  );
}

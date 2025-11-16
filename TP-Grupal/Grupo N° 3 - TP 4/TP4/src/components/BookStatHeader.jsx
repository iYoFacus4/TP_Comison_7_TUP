import { Row, Col } from "react-bootstrap";
import StatCard from "./StatCard";
import { Heart, MessageSquare, Star } from "lucide-react";

/** Header de métricas del libro seleccionado (usa lucide-react) */
export default function BookStatsHeader({ libro }) {
  if (!libro) return null;

  return (
    <Row className="mb-4">
      <Col md={4}>
        <StatCard
          title="Likes"
          value={libro.likes ?? 0}
          color="danger"
          icon={<Heart />}
        />
      </Col>

      <Col md={4}>
        <StatCard
          title="Comentarios"
          value="Ver comentarios"
          color="primary"
          icon={<MessageSquare />}
          link={libro.linkComentarios}
        />
      </Col>

      <Col md={4}>
        <StatCard
          title="Puntaje"
          value={libro.puntaje ?? "N/A"}
          color="warning"
          icon={<Star />}
        />
      </Col>
    </Row>
  );
}

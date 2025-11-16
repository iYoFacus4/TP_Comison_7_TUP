import { Card } from "react-bootstrap";

export default function CardCourse({ course }) {
  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>{course.nombre}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{course.categoria}</Card.Subtitle>
        <Card.Text>
          <strong>Duración:</strong> {course.duracion} hs <br />
          <strong>Cupo:</strong> {course.cupo}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

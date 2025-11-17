import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getCourses } from "../../store/dataService";
import CardCourse from "../../components/ui/CardCourse";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📚 Cursos</h2>
        <Button as={Link} to="/courses/create" variant="primary">
          ➕ Nuevo Curso
        </Button>
      </div>

      {courses.length === 0 ? (
        <p>No hay cursos registrados.</p>
      ) : (
        courses.map((course) => <CardCourse key={course.id} course={course} />)
      )}
    </>
  );
}

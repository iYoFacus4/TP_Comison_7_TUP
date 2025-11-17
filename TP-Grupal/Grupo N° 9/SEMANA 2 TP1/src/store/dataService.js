// ✅ Simula base de datos local en localStorage

const saveData = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  const getData = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };
  
  // ----------------- CURSOS -----------------
  export const addCourse = (course) => {
    const courses = getData("courses");
    const id = Date.now();
    const newCourse = { id, ...course };
    courses.push(newCourse);
    saveData("courses", courses);
    return { success: true };
  };
  
  export const getCourses = () => getData("courses");
  
  // ----------------- ALUMNOS -----------------
  export const addStudent = (student) => {
    const students = getData("students");
    const id = Date.now();
    const newStudent = { id, ...student };
    students.push(newStudent);
    saveData("students", students);
    return { success: true };
  };
  
  export const getStudents = () => getData("students");
  
  // ----------------- INSCRIPCIONES -----------------
  export const addEnrollment = ({ alumnoId, cursoId }) => {
    const enrollments = getData("enrollments");
    const courses = getData("courses");
    const course = courses.find((c) => c.id == cursoId);
  
    if (!course) return { success: false, message: "Curso no encontrado" };
  
    const count = enrollments.filter((e) => e.cursoId == cursoId).length;
    if (count >= Number(course.cupo)) {
      return { success: false, message: "Cupo completo ❌" };
    }
  
    const id = Date.now();
    const fecha = new Date().toLocaleDateString();
    enrollments.push({ id, alumnoId: Number(alumnoId), cursoId: Number(cursoId), fecha });
    saveData("enrollments", enrollments);
    return { success: true };
  };
  
  export const getEnrollments = () => getData("enrollments");
  

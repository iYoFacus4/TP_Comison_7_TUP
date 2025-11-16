
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

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
  // validación mínima
  if (!course?.nombre || !course?.cupo) {
    return { success: false, message: "Nombre y cupo requeridos" };
  }
  // evitar duplicados por nombre (case-insensitive)
  if (courses.some((c) => c.nombre?.toLowerCase() === course.nombre?.toLowerCase())) {
    return { success: false, message: "Ya existe un curso con ese nombre" };
  }

  const id = Date.now();
  const newCourse = { id, ...course, cupo: Number(course.cupo) };
  courses.push(newCourse);
  saveData("courses", courses);
  return { success: true, course: newCourse };
};

export const getCourses = () => getData("courses");

// Async wrappers (simulan peticiones)
export const addCourseAsync = async (course) => {
  await delay(400);
  return addCourse(course);
};

export const getCoursesAsync = async () => {
  await delay(300);
  return getCourses();
};

// ----------------- ALUMNOS -----------------
export const addStudent = (student) => {
  const students = getData("students");
  if (!student?.nombre || !student?.email) {
    return { success: false, message: "Nombre y email requeridos" };
  }
  // evitar duplicado por email
  if (students.some((s) => s.email?.toLowerCase() === student.email?.toLowerCase())) {
    return { success: false, message: "Ya existe un alumno con ese email" };
  }

  const id = Date.now();
  const newStudent = { id, ...student };
  students.push(newStudent);
  saveData("students", students);
  return { success: true, student: newStudent };
};

export const getStudents = () => getData("students");

export const addStudentAsync = async (student) => {
  await delay(300);
  return addStudent(student);
};

export const getStudentsAsync = async () => {
  await delay(300);
  return getStudents();
};

// ----------------- INSCRIPCIONES -----------------
export const addEnrollment = ({ alumnoId, cursoId }) => {
  const enrollments = getData("enrollments");
  const courses = getData("courses");
  const students = getData("students");

  const course = courses.find((c) => c.id === Number(cursoId));
  const student = students.find((s) => s.id === Number(alumnoId));

  if (!course) return { success: false, message: "Curso no encontrado" };
  if (!student) return { success: false, message: "Alumno no encontrado" };

  // evitar inscribir dos veces al mismo alumno en el mismo curso
  if (enrollments.some((e) => e.alumnoId === Number(alumnoId) && e.cursoId === Number(cursoId))) {
    return { success: false, message: "Alumno ya inscrito en este curso" };
  }

  const count = enrollments.filter((e) => e.cursoId === Number(cursoId)).length;
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

export const addEnrollmentAsync = async (payload) => {
  await delay(300);
  return addEnrollment(payload);
};

export const getEnrollmentsAsync = async () => {
  await delay(300);
  return getEnrollments();
};

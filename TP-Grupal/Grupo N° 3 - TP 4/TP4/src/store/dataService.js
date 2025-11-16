// src/store/dataService.js
export const STORAGE_KEYS = {
    BOOKS: "biblioteca_libros",
    STUDENTS: "biblioteca_alumnos",
    LOANS: "biblioteca_prestamos",
  };
  
  // ✅ Funciones generales
  const getData = (key) => JSON.parse(localStorage.getItem(key)) || [];
  const saveData = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  
  // 📚 Libros
  export function addBook(libro) {
    const libros = getData(STORAGE_KEYS.BOOKS);
    libro.id = Date.now();
    libros.push(libro);
    saveData(STORAGE_KEYS.BOOKS, libros);
  }
  
  export function getBooks() {
    return getData(STORAGE_KEYS.BOOKS);
  }
  
  // 👩‍🎓 Alumnos
  export function addStudent(alumno) {
    const alumnos = getData(STORAGE_KEYS.STUDENTS);
    alumno.id = Date.now();
    alumnos.push(alumno);
    saveData(STORAGE_KEYS.STUDENTS, alumnos);
  }
  
  export function getStudents() {
    return getData(STORAGE_KEYS.STUDENTS);
  }
  
  // 📖 Préstamos
  export function addLoan(prestamo) {
    const prestamos = getData(STORAGE_KEYS.LOANS);
    const libros = getData(STORAGE_KEYS.BOOKS);
  
    // Control de stock
    const libro = libros.find(l => l.id === prestamo.libroId);
    if (!libro || libro.cantidadDisponible <= 0) {
      throw new Error("No hay ejemplares disponibles");
    }
  
    // Descontar stock
    libro.cantidadDisponible -= 1;
    saveData(STORAGE_KEYS.BOOKS, libros);
  
    // Guardar préstamo
    prestamo.id = Date.now();
    prestamos.push(prestamo);
    saveData(STORAGE_KEYS.LOANS, prestamos);
  }
  
  export function getLoans() {
    return getData(STORAGE_KEYS.LOANS);
  }
  
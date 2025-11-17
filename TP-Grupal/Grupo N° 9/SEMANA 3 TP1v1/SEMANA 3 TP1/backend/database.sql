-- backend/database.sql

CREATE DATABASE IF NOT EXISTS biblioteca_tp;
USE biblioteca_tp;

-- Tabla de usuarios para el login
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  rol ENUM('admin', 'user') DEFAULT 'user'
);

INSERT INTO usuarios (nombre, email, password, rol) VALUES
('Admin Biblioteca', 'admin@biblioteca.com', 'admin123', 'admin');

-- Tabla de libros
CREATE TABLE IF NOT EXISTS libros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  disponibles INT NOT NULL DEFAULT 0
);

INSERT INTO libros (titulo, autor, disponibles) VALUES
('El Principito', 'Saint-Exupéry', 5),
('1984', 'George Orwell', 2),
('Fahrenheit 451', 'Ray Bradbury', 0);

-- Tabla de alumnos
CREATE TABLE IF NOT EXISTS alumnos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE
);

INSERT INTO alumnos (nombre, dni) VALUES
('Ana Gómez', '40222111'),
('Luis Núñez', '40111222');

-- Tabla de prestamos
CREATE TABLE IF NOT EXISTS prestamos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libroId INT NOT NULL,
  alumnoId INT NOT NULL,
  fecha DATE NOT NULL,
  devolucion DATE,
  FOREIGN KEY (libroId) REFERENCES libros(id),
  FOREIGN KEY (alumnoId) REFERENCES alumnos(id)
);

INSERT INTO prestamos (libroId, alumnoId, fecha, devolucion) VALUES
(1, 2, '2025-10-20', '2025-10-27');

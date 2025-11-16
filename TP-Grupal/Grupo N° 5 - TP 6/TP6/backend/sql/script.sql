USE eventosdb;


-- Tabla: usuarios

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  contrasenia VARCHAR(100) NOT NULL,
  rol ENUM('admin', 'usuario') DEFAULT 'usuario'
);

INSERT INTO usuarios (email, contrasenia, rol) VALUES
('Usuario@gmail.com', '123456', 'admin');


-- Tabla: asistentes

CREATE TABLE IF NOT EXISTS asistentes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  fechaNac DATE NOT NULL,
  dni VARCHAR(20),
  email VARCHAR(100),
  telefono VARCHAR(20)
);

INSERT INTO asistentes (nombre, apellido, fechaNac, dni, email, telefono) VALUES
('Juan', 'Pérez', '2001-10-30', '', '', ''),
('Lucía', 'Gómez', '1999-01-20', '', '', ''),
('Carlos', 'Ruiz', '2004-03-15', '', '', ''),
('Fabricio', 'Toranzo', '2004-03-08', '', '', '');


-- Tabla: artistas

CREATE TABLE IF NOT EXISTS artistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  nombreArt VARCHAR(100),
  dni VARCHAR(20),
  fechaNac DATE,
  disponible BOOLEAN DEFAULT TRUE
);

INSERT INTO artistas (nombre, apellido, nombreArt, dni, fechaFormateada, disponible) VALUES
('Miguel', 'Martin', 'Gordillo', '23123456', '1989-10-30', TRUE),
('Maria', 'Becerra', 'La Nena Argentina', '24627416', '1988-04-15', TRUE),
('Mauro', 'Monzon', 'Lit-Killa', '2234564', '1985-12-12', TRUE);


-- Tabla: eventos

CREATE TABLE IF NOT EXISTS eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  fecha DATE NOT NULL,
  lugar VARCHAR(100) NOT NULL,
  cupo INT DEFAULT 0
);

INSERT INTO eventos (nombre, fecha, lugar, cupo) VALUES
('Feria Del Condado', '2025-11-21', 'Parque 9 De Julio', 10),
('La Expo', '2025-12-22', 'Laprida y Corrientes', 20),
('Norte Rock', '2025-11-04', 'Presidente Peron 1500', 200);


-- Tablas intermedias (relaciones N:N)

CREATE TABLE IF NOT EXISTS evento_asistente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_evento INT,
  id_asistente INT,
  FOREIGN KEY (id_evento) REFERENCES eventos(id),
  FOREIGN KEY (id_asistente) REFERENCES asistentes(id)
);

CREATE TABLE IF NOT EXISTS evento_artista (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_evento INT,
  id_artista INT,
  FOREIGN KEY (id_evento) REFERENCES eventos(id),
  FOREIGN KEY (id_artista) REFERENCES artistas(id)
);

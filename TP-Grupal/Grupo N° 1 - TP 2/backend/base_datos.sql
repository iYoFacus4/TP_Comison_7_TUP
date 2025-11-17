
CREATE DATABASE IF NOT EXISTS ClinicaDB;
USE ClinicaDB;

-- Tabla de Pacientes
CREATE TABLE pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE,
    telefono VARCHAR(20),
    email VARCHAR(100),
    direccion VARCHAR(100)
);

-- Tabla de Especialidades
CREATE TABLE especialidades (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla de Doctores
CREATE TABLE doctores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(10),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    especialidad_id INT,
    telefono VARCHAR(20),
    email VARCHAR(100),
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(id)
);

-- Tabla de Citas
CREATE TABLE citas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    doctor_id INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    motivo VARCHAR(100),
    estado ENUM('pendiente', 'confirmada', 'cancelada') DEFAULT 'pendiente',
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (doctor_id) REFERENCES doctores(id)
);

-- Tabla de Horarios
CREATE TABLE horarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_id INT NOT NULL,
    dia VARCHAR(20),
    inicio TIME,
    fin TIME,
    FOREIGN KEY (doctor_id) REFERENCES doctores(id)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    role ENUM('admin', 'recepcionista', 'medico', 'paciente') NOT NULL
);

-- DATOS DE PRUEBA

-- Usuarios
INSERT INTO usuarios (email, contraseña, nombre, apellido, telefono, role) VALUES
('admin@test.com', '123456', 'Admin', 'Sistema', '3512345678', 'admin'),
('recepcion@test.com', '123456', 'María', 'Recepcionista', '3519876543', 'recepcionista'),
('medico@test.com', '123456', 'Dr. Carlos', 'García', '3511122334', 'medico'),
('paciente@test.com', '123456', 'Juan', 'Pérez', '3519988776', 'paciente');

-- Especialidades
INSERT INTO especialidades (id, nombre) VALUES
(1, 'Clínica general'),
(2, 'Pediatría'),
(3, 'Cardiología'),
(4, 'Dermatología'),
(5, 'Ginecología'),
(6, 'Traumatología'),
(7, 'Oftalmología'),
(8, 'Neurología'),
(9, 'Psiquiatría'),
(10, 'Endocrinología');

-- Doctores
INSERT INTO doctores (id, titulo, nombre, apellido, especialidad_id, telefono, email) VALUES
(1, 'Dr.', 'Rafael', 'Santana', 1, '11-5555-0001', 'rafael.santana@clinica.com'),
(2, 'Dra.', 'Laura', 'Benítez', 2, '11-5555-0002', 'laura.benitez@clinica.com'),
(3, 'Dr.', 'Pablo', 'Herrera', 3, '11-5555-0003', 'pablo.herrera@clinica.com'),
(4, 'Dra.', 'Ana', 'Sosa', 4, '11-5555-0004', 'ana.sosa@clinica.com'),
(5, 'Dr.', 'Martín', 'Ibarra', 5, '11-5555-0005', 'martin.ibarra@clinica.com'),
(6, 'Dra.', 'Cecilia', 'Romero', 6, '11-5555-0006', 'cecilia.romero@clinica.com'),
(7, 'Dr.', 'Hugo', 'Flores', 7, '11-5555-0007', 'hugo.flores@clinica.com'),
(8, 'Dra.', 'Isabel', 'Muñoz', 8, '11-5555-0008', 'isabel.munoz@clinica.com'),
(9, 'Dr.', 'Esteban', 'Córdoba', 9, '11-5555-0009', 'esteban.cordoba@clinica.com'),
(10, 'Dra.', 'Natalia', 'Paz', 10, '11-5555-0010', 'natalia.paz@clinica.com');

-- Pacientes
INSERT INTO pacientes (id, nombre, apellido, dni, fecha_nacimiento, telefono, email, direccion) VALUES
(1, 'Martín', 'García', '30123456', '1985-04-12', '11-4231-0001', 'martin.garcia@example.com', 'Calle Falsa 123'),
(2, 'Lucía', 'Pérez', '30123457', '1990-09-05', '11-4231-0002', 'lucia.perez@example.com', 'Av. Siempre Viva 742'),
(3, 'Diego', 'Ramírez', '30123458', '1978-02-20', '11-4231-0003', 'diego.ramirez@example.com', 'Calle 9 456'),
(4, 'Sofía', 'López', '30123459', '2000-11-15', '11-4231-0004', 'sofia.lopez@example.com', 'Bv. San Martín 100'),
(5, 'Javier', 'Fernández', '30123460', '1969-07-08', '11-4231-0005', 'javier.fernandez@example.com', 'Pasaje 3 22'),
(6, 'María', 'Gómez', '30123461', '1995-03-30', '11-4231-0006', 'maria.gomez@example.com', 'Calle 1 77'),
(7, 'Andrés', 'Ruiz', '30123462', '1982-12-02', '11-4231-0007', 'andres.ruiz@example.com', 'Av. Belgrano 12'),
(8, 'Valentina', 'Torres', '30123463', '1998-06-18', '11-4231-0008', 'valentina.torres@example.com', 'Calle Olmos 45'),
(9, 'Gonzalo', 'Vega', '30123464', '1975-01-25', '11-4231-0009', 'gonzalo.vega@example.com', 'Calle Real 9'),
(10, 'Carolina', 'Ríos', '30123465', '1988-08-09', '11-4231-0010', 'carolina.rios@example.com', 'Av. Rivadavia 200'),
(11, 'Federico', 'Molina', '30123466', '1992-10-03', '11-4231-0011', 'federico.molina@example.com', 'Calle Luna 6'),
(12, 'Alicia', 'Santos', '30123467', '1955-05-20', '11-4231-0012', 'alicia.santos@example.com', 'Bv. Libertador 300'),
(13, 'Bruno', 'Castro', '30123468', '1980-04-01', '11-4231-0013', 'bruno.castro@example.com', 'Pasaje Verde 8'),
(14, 'Marta', 'Quinteros', '30123469', '1970-09-29', '11-4231-0014', 'marta.quinteros@example.com', 'Calle Azul 33'),
(15, 'Lucas', 'Ortega', '30123470', '2002-02-14', '11-4231-0015', 'lucas.ortega@example.com', 'Av. Córdoba 110');

-- Citas
INSERT INTO citas (id, paciente_id, doctor_id, fecha, hora, motivo, estado) VALUES
(1, 1, 1, '2025-11-10', '09:00', 'Consulta general', 'confirmada'),
(2, 2, 2, '2025-11-11', '10:00', 'Control pediátrico', 'confirmada'),
(3, 3, 3, '2025-11-12', '11:00', 'Dolor de pecho', 'pendiente'),
(4, 4, 4, '2025-11-13', '12:00', 'Consulta dermatológica', 'confirmada'),
(5, 5, 5, '2025-11-14', '09:30', 'Control ginecológico', 'confirmada'),
(6, 6, 6, '2025-11-15', '10:30', 'Seguimiento fractura', 'cancelada'),
(7, 7, 7, '2025-11-16', '11:30', 'Revisión de la vista', 'confirmada'),
(8, 8, 8, '2025-11-17', '12:30', 'Cefalea recurrente', 'pendiente'),
(9, 9, 9, '2025-11-18', '09:15', 'Consulta psiquiátrica', 'confirmada'),
(10, 10, 10, '2025-11-19', '10:15', 'Diabetes - control', 'confirmada'),
(11, 11, 1, '2025-11-20', '11:15', 'Chequeo general', 'pendiente'),
(12, 12, 2, '2025-11-21', '12:15', 'Control pediátrico', 'confirmada'),
(13, 13, 3, '2025-11-22', '09:45', 'Ecocardiograma', 'pendiente'),
(14, 14, 4, '2025-11-23', '10:45', 'Dermatología - seguimiento', 'confirmada'),
(15, 15, 5, '2025-11-24', '11:45', 'Ginecología - control', 'confirmada'),
(16, 1, 6, '2025-11-25', '09:50', 'Traumatología - seguimiento', 'confirmada'),
(17, 2, 7, '2025-11-26', '10:50', 'Oftalmología - consulta', 'pendiente'),
(18, 3, 8, '2025-11-27', '11:50', 'Neurología - evaluación', 'confirmada'),
(19, 4, 9, '2025-11-28', '12:50', 'Psiquiatría - sesión', 'confirmada'),
(20, 5, 10, '2025-11-29', '09:05', 'Endocrinología - control', 'pendiente');

-- Horarios
INSERT INTO horarios (id, doctor_id, dia, inicio, fin) VALUES
(1, 1, 'Lunes', '08:00', '12:00'),
(2, 1, 'Miércoles', '14:00', '18:00'),
(3, 2, 'Martes', '09:00', '13:00'),
(4, 2, 'Jueves', '15:00', '19:00'),
(5, 3, 'Lunes', '10:00', '14:00'),
(6, 4, 'Viernes', '08:00', '12:00'),
(7, 5, 'Miércoles', '09:00', '13:00'),
(8, 6, 'Martes', '14:00', '18:00'),
(9, 7, 'Jueves', '08:00', '12:00'),
(10, 8, 'Lunes', '15:00', '19:00'),
(11, 9, 'Miércoles', '08:30', '12:30'),
(12, 10, 'Viernes', '09:00', '13:00');


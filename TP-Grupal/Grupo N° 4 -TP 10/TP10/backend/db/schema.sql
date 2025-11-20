-- ========================================
-- Script de creación de base de datos
-- Sistema de Peluquería - TP Semana 3 - Grupo N° 4
-- ========================================

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS tp_semana3;
USE tp_semana3;

-- ========================================
-- Tabla de usuarios (para autenticación)
-- ========================================
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL COMMENT 'Contraseña hasheada con bcrypt',
  nombre VARCHAR(150),
  rol ENUM('admin', 'barbero', 'cliente') DEFAULT 'barbero',
  activo BOOLEAN DEFAULT TRUE,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultimo_acceso TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Tabla de clientes
-- ========================================
DROP TABLE IF EXISTS appointments;
DROP TABLE IF EXISTS clients;
CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Tabla de servicios
-- ========================================
DROP TABLE IF EXISTS services;
CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  duration INT NOT NULL COMMENT 'Duración en minutos',
  price DECIMAL(10, 2) NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Tabla de citas/turnos (appointments)
-- ========================================
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  service_id INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status ENUM('pendiente', 'confirmado', 'completado', 'cancelado') DEFAULT 'pendiente',
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ========================================
-- Índices adicionales para optimización
-- ========================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_services_available ON services(available);
CREATE INDEX idx_appointments_client ON appointments(client_id);
CREATE INDEX idx_appointments_service ON appointments(service_id);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_datetime ON appointments(date, time);

-- ========================================
-- Datos de prueba básicos
-- ========================================

-- Insertar usuarios de ejemplo (contraseña: "admin123" y "barbero123" hasheadas con bcrypt)
INSERT INTO users (username, email, password, nombre, rol) VALUES
('admin', 'admin@barberia.com', '$2b$10$rZ5YqN8xW0JQlGkK3mF8PuO6WVXqwYhHJzJfI6Xr5KnM7yC9XYZH6', 'Administrador', 'admin'),
('barbero1', 'barbero@barberia.com', '$2b$10$rZ5YqN8xW0JQlGkK3mF8PuO6WVXqwYhHJzJfI6Xr5KnM7yC9XYZH6', 'Juan Pérez', 'barbero');

-- Insertar clientes de ejemplo
INSERT INTO clients (id, name, email, phone) VALUES
(1, 'Toranzo Fabricio', 'fa@mail.com', NULL),
(2, 'Ibañez Benjamin', 'ibañ@mail.com', NULL),
(3, 'Palacios Esteban', 'des@mail.com', NULL),
(4, 'Gonzalez Maria', 'maria@mail.com', NULL),
(5, 'Lola Mora', 'lolamora@gmail.com', NULL);

-- Insertar servicios de ejemplo
INSERT INTO services (id, name, description, duration, price, available) VALUES
(1, 'Corte Clásico', 'Corte de pelo tradicional', 30, 7000.00, TRUE),
(2, 'Tintura', 'Coloración completa del pelo', 150, 20000.00, TRUE),
(3, 'Corte Normal con lavado y secado', 'Corte normal puede incluir degrade o no con lavado y secado de pelo', 45, 10000.00, TRUE);

-- Insertar citas de ejemplo
INSERT INTO appointments (id, client_id, service_id, date, time, status) VALUES
(1, 1, 2, '2025-10-22', '10:00:00', 'completado'),
(2, 2, 1, '2025-10-22', '12:00:00', 'completado'),
(3, 1, 1, '2025-10-23', '11:00:00', 'completado'),
(4, 3, 1, '2025-11-12', '12:15:00', 'completado'),
(5, 4, 2, '2025-11-12', '15:00:00', 'completado'),
(6, 5, 2, '2025-11-14', '21:20:00', 'pendiente'),
(7, 3, 1, '2025-11-13', '19:30:00', 'completado');

-- ========================================
-- Verificación de tablas creadas
-- ========================================
SHOW TABLES;

-- Mostrar resumen de datos
SELECT 'Usuarios registrados:' as Info, COUNT(*) as Total FROM users
UNION ALL
SELECT 'Clientes registrados:' as Info, COUNT(*) as Total FROM clients
UNION ALL
SELECT 'Servicios disponibles:', COUNT(*) FROM services WHERE available = TRUE
UNION ALL
SELECT 'Citas totales:', COUNT(*) FROM appointments;

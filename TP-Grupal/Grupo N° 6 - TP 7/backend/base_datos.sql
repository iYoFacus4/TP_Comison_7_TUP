-- =========================
-- TP7 - Sistema de Reservas de Gimnasio
-- Esquema limpio + seed mínimo
-- =========================

-- 0) Crear base y usarla
CREATE DATABASE IF NOT EXISTS gym_db;
USE gym_db;

-- 1) LIMPIEZA (dropear en orden por FKs)
DROP TABLE IF EXISTS reservas;
DROP TABLE IF EXISTS actividades;
DROP TABLE IF EXISTS socios;
DROP TABLE IF EXISTS usuarios;

-- 2) Tablas

-- 2.1 Usuarios (login + roles)
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  rol ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2.2 Socios
CREATE TABLE socios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE,
  telefono VARCHAR(30),
  plan VARCHAR(20),      -- 'Básico' / 'Full'
  status VARCHAR(20),    -- 'Activo' / 'Inactivo'
  fecha_ingreso DATE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2.3 Actividades
CREATE TABLE actividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  cupo_maximo INT NOT NULL,
  horario VARCHAR(50),
  dias VARCHAR(120),
  instructor VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2.4 Reservas
CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  socio_id INT NOT NULL,
  actividad_id INT NOT NULL,
  fecha DATE NOT NULL,
  estado ENUM('activa','cancelada','asistida') NOT NULL DEFAULT 'activa',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reserva_socio
    FOREIGN KEY (socio_id) REFERENCES socios(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_reserva_actividad
    FOREIGN KEY (actividad_id) REFERENCES actividades(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 3) Seed mínimo

-- Admin: email=admin@test.com / pass=123456
-- Hash bcrypt (10 rounds) válido para "123456"
INSERT INTO usuarios (email, password_hash, rol)
VALUES ('admin@test.com', '$2b$10$8ezb4v5hT8qvV/4qu/2lD.2QKQ7p8kD7dRjLKMQ1eZfUoZgEOLaaK', 'admin');

-- Socios base (coherentes con tu front)
INSERT INTO socios (id, nombre, email, telefono, plan, status, fecha_ingreso) VALUES
(1, 'Ana Gómez',  'ana.gomez@email.com',  '1123456789', 'Full',   'Activo',   '2024-01-15'),
(2, 'Juan Pérez', 'juan.perez@email.com', '1123456790', 'Básico', 'Activo',   '2024-02-20'),
(3, 'Maria Sol',  'maria.sol@email.com',  '1123456791', 'Full',   'Inactivo', '2023-11-10');

-- Actividades base (coherentes con tu front)
INSERT INTO actividades (id, nombre, cupo_maximo, horario, dias, instructor) VALUES
(1, 'Yoga',     20, '09:00 - 10:00',       'Lunes, Miércoles, Viernes', 'María González'),
(2, 'Crossfit', 15, '18:00 - 19:30',       'Martes, Jueves',             'Carlos Martínez'),
(3, 'Spinning', 25, '19:00 - 20:00',       'Martes, Jueves, Sábado',     'Juan Pérez');

-- Reserva de ejemplo (opcional)
INSERT INTO reservas (socio_id, actividad_id, fecha, estado)
VALUES (1, 1, CURDATE(), 'activa');

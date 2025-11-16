📌 TP — Semana 3

Tecnicatura Universitaria en Programación — Comisión 7
Profesor: Chocobar Matías
📅 Fecha límite: Viernes 14 — 18:00 hs

🎯 Objetivo Semana 3

Migrar el proyecto de la Semana 2 hacia un entorno Full Stack real, reemplazando el uso de json-server y localStorage por un backend Node.js conectado a una base de datos MySQL.

⚙️ Requerimientos Generales

Crear una carpeta /backend dentro de la carpeta del grupo (paralela al /frontend).

Configurar un servidor Node.js + Express + MySQL.

Reemplazar el endpoint del json-server por el del backend local (localhost).

Conectar el backend a una base de datos MySQL (crear y adjuntar el script .sql dentro del backend).

Implementar Zustand en el frontend para manejar el login real (capturar nombre y rol del usuario).

Eliminar totalmente el uso de localStorage y json-server.

🧱 Estructura básica del backend

Dentro de la carpeta del grupo:

 

![Estructura del proyecto](./carpeta%20back.jpg)

 🔐 Ejemplo de .env

PORT=3001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=nombre_de_tu_db
JWT_SECRET=clave_secreta_segura


💻 Instalación y configuración del backend

1️⃣ Inicializar el proyecto

npm init -y

2️⃣ Instalar dependencias necesarias

npm install express mysql2 dotenv cors helmet morgan jsonwebtoken

3️⃣ Instalar nodemon (modo desarrollo)

npm install --save-dev nodemon

4️⃣ Agregar script en package.json

"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}

5️⃣ Levantar el servidor

npm run dev


Si todo está correcto, verás en consola:
Servidor corriendo en http://localhost:3001
Base de datos conectada exitosamente

🧠 Diferencia entre CommonJS y ES6 Modules

Concepto	            CommonJS	                            ES6 Modules

Sintaxis	            require() y module.exports	          import y export

Soporte	              Nativo en Node.js (por defecto	      Estándar moderno de JavaScript
                       en versiones previas)

Carga de módulos	    Dinámica (en tiempo de ejecución)	    Estática (analizada antes de ejecutar)

Archivo principal	    No necesita "type": "module"	         Debe incluir "type": "module" en package.json

🔎 Ejemplo rápido:
CommonJS:

const express = require('express');
module.exports = router;


ES6:

import express from 'express';
export default router;


🔁 Sincronización del repositorio

No crear un nuevo fork.

El líder debe ir a su GitHub y presionar “Sync Fork”
para obtener los nuevos cambios del profesor.

Luego, en su clon local:
---
git pull origin main

🧩 Requerimientos técnicos específicos

Backend en Node.js + Express.

Conexión estable a MySQL mediante archivo db.js.

CRUD funcional.

Implementar Zustand en el frontend para el manejo del usuario logueado.

Sustituir completamente json-server y localStorage.

Backend operativo con npm run dev.

📋 Archivo obligatorio de auditoría

Cada grupo debe incluir dentro de su carpeta:

Auditoria_Semana_3.md (OBLIGATORIO)

Secciones:

1️⃣ ANTES DE TRABAJAR:

Qué encontraron del TP anterior (errores, faltantes, bugs).

2️⃣ DESPUÉS DE TRABAJAR:

Qué corrigieron y qué agregaron (Zustand, backend, conexión DB, etc.).

Este documento demuestra la capacidad de revisión, diagnóstico y mejora continua del equipo.

🧮 Flujo GIT — Semana 3

LÍDER

Sincroniza el fork con el repo del profesor.

Integra ramas de los integrantes en dev.

Hace merge dev → main.

Envía el Pull Request final.

INTEGRANTES

Trabajan en su rama Nombre_Legajo.

Hacen push de sus cambios.

Avisan al líder para integrar.

🚀 Entrega

Solo el líder del grupo realiza el Pull Request.

Título del PR:
TP Semana 3 — Grupo X — Comisión 7

Fecha límite: Domingo 09 — 18:00 hs

✅ Checklist antes de enviar

 Backend creado y funcional

 Base de datos MySQL conectada

 Frontend conectado al backend

 Zustand implementado

 Auditoria_Semana_3.md completada

 Merge dev → main sin conflictos

 PR enviado por el líder
// backend/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const db = require('./db');

const authRoutes = require('./routes/auth.routes');
const librosRoutes = require('./routes/libros.routes');
const alumnosRoutes = require('./routes/alumnos.routes');
const prestamosRoutes = require('./routes/prestamos.routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// Probar conexión a la DB al inicio
db.getConnection()
  .then((conn) => {
    console.log('Base de datos conectada exitosamente');
    conn.release();
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/prestamos', prestamosRoutes);

// Healthcheck
app.get('/', (req, res) => {
  res.send('API TP Grupo 9 funcionando');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

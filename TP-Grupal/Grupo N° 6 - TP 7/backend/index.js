require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const { query } = require('./config/db');

const usuariosRouter = require('./routers/usuariosRouter');
const sociosRouter = require('./routers/socios');
const actividadesRouter = require('./routers/actividades');
const reservasRouter = require('./routers/reservas');

const app = express();

// Middlewares base
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck simple
app.get('/health', (_req, res) => res.json({ ok: true }));

// Rutas de API
app.use('/api/usuarios', usuariosRouter);
app.use('/api/socios', sociosRouter);
app.use('/api/actividades', actividadesRouter);
app.use('/api/reservas', reservasRouter);

// Arranque del servidor + ping a la DB
const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
  try {
    await query('SELECT 1');
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Base de datos conectada exitosamente');
  } catch (err) {
    console.error('Error al iniciar el servidor o conectar a la DB:', err);
  }
});

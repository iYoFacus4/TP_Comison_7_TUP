// 1. Importaciones
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js'; 

// --- Importar Routers ---
// CORRECCIÓN 2: Apuntamos a la carpeta 'routes'
import sociosRouter from './routers/sociosRouter.js'; 
import deportesRouter from './routers/deportesRouter.js';
import cuotasRouter from './routers/cuotasRouter.js';
import dashboardRouter from './routers/dashboardRouter.js'; 

// 2. Configuraciones
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// 3. Middlewares
app.use(cors());
app.use(express.json());

// --- RUTAS DE LA API (Esto estaba bien) ---
app.use('/api/socios', sociosRouter);
app.use('/api/deportes', deportesRouter);
app.use('/api/cuotas', cuotasRouter);
app.use('/api/dashboard', dashboardRouter);

// 4. Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡API del Club Deportivo funcionando!');
});

// 5. Iniciar el servidor (Simplificado)
// CORRECCIÓN 3: Simplificamos el 'listen'. El archivo 'db.js'
// ya reporta si la conexión es exitosa o no.
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'; 
import helmet from 'helmet'; 
import { testConnection } from './db.js'; 
import authRouter from './routes/auth.routes.js'; 


dotenv.config();


const PORT = process.env.PORT || 3001;


const app = express();


app.use(cors()); 
app.use(helmet()); 
app.use(morgan('dev')); 
app.use(express.json()); 


app.use('/api/auth', authRouter); 



app.get('/', (req, res) => {
    res.send('Servidor del Club Deportivo Activo. Ve a /api para interactuar.');
});


// Inicializar servidor y probar conexión a DB
async function startServer() {
    // 1. Probar la conexión a la base de datos
    await testConnection(); 

    // 2. Iniciar el servidor Express
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}

startServer();
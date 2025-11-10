import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import pool from './db/db.js';

// Importación de Rutas 
import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/client.routes.js';
import productRoutes from './routes/product.routes.js';
import saleRoutes from './routes/sale.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());



//  Rutas del API 
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);


app.listen(PORT, async () => {
  try {
    await pool.query('SELECT 1');
    console.log('Base de datos conectada exitosamente ');
    console.log(`Servidor corriendo en http://localhost:${PORT} `);
  } catch (error) {
    console.error(' Error al conectar con la base de datos:', error.message);
  }
});
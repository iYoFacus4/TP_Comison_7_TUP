import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';
import pool from './db/db.js';


import authRoutes from './routes/authRoutes.js';

//import clientRoutes from './routes/clientRoutes.js';
//import productRoutes from './routes/productRoutes.js';
import saleRoutes from './routes/saleRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());




app.use('/api/auth', authRoutes);

//app.use('/api/clients', clientRoutes);
//app.use('/api/products', productRoutes);
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
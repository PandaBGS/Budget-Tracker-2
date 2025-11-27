import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

// Enable All CORS Requests
app.use(cors());

// Body parser
app.use(express.json());

// Mount routes
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/transactions', transactionRoutes);

export default app;

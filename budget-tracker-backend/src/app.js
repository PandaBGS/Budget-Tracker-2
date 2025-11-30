import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express'; // Tambahkan import ini
import swaggerSpecs from './config/swagger.js'; // Tambahkan import ini
import categoryRoutes from './routes/categoryRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

// Enable All CORS Requests
app.use(cors());

// Body parser
app.use(express.json());

// Swagger Documentation Route
// Endpoint ini akan menampilkan UI dokumentasi API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Mount routes
app.use('/api/v1/categories', categoryRoutes); //
app.use('/api/v1/transactions', transactionRoutes); //

export default app;
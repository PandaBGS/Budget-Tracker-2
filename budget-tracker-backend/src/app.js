import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.js';
import categoryRoutes from './routes/categoryRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// --- MODIFIKASI MULAI DARI SINI ---

// Gunakan CDN untuk memuat aset Swagger UI agar tidak error di Vercel
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css";
const JS_URL_BUNDLE = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js";
const JS_URL_PRESET = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js";

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, {
    customCssUrl: CSS_URL,
    customJs: [JS_URL_BUNDLE, JS_URL_PRESET],
  })
);

// --- MODIFIKASI SELESAI ---

app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/transactions', transactionRoutes);

export default app;
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Budget Tracker API',
      version: '1.0.0',
      description: 'API Documentation for Budget Tracker Application',
      contact: {
        name: 'Developer',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Category: {
          type: 'object',
          required: ['name', 'type'],
          properties: {
            id: { type: 'string', format: 'uuid', description: 'Auto-generated UUID' },
            name: { type: 'string', description: 'Category name' },
            type: { type: 'string', enum: ['income', 'expense'], description: 'Category type' },
            created_at: { type: 'string', format: 'date-time' }
          },
        },
        Transaction: {
          type: 'object',
          required: ['amount', 'date', 'type', 'category_id'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            amount: { type: 'number', description: 'Transaction amount' },
            date: { type: 'string', format: 'date-time' },
            description: { type: 'string' },
            category_id: { type: 'string', format: 'uuid' },
            type: { type: 'string', enum: ['income', 'expense'] },
            created_at: { type: 'string', format: 'date-time' }
          },
        },
      },
    },
    paths: {
      '/categories': {
        get: {
          summary: 'Get all categories',
          tags: ['Categories'],
          responses: {
            200: { description: 'List of all categories', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Category' } } } } },
          },
        },
        post: {
          summary: 'Create a new category',
          tags: ['Categories'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', properties: { name: { type: 'string' }, type: { type: 'string', enum: ['income', 'expense'] } } } } },
          },
          responses: {
            201: { description: 'Category created successfully' },
            400: { description: 'Invalid input' },
          },
        },
      },
      '/categories/{id}': {
        delete: {
          summary: 'Delete a category',
          tags: ['Categories'],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'Category ID' }],
          responses: {
            200: { description: 'Category deleted' },
            404: { description: 'Category not found' },
          },
        },
      },
      '/transactions': {
        get: {
          summary: 'Get all transactions',
          tags: ['Transactions'],
          responses: {
            200: { description: 'List of transactions', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Transaction' } } } } },
          },
        },
        post: {
          summary: 'Create a new transaction',
          tags: ['Transactions'],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } },
          },
          responses: {
            201: { description: 'Transaction created successfully' },
            400: { description: 'Validation error' },
          },
        },
      },
      '/transactions/summary': {
        get: {
          summary: 'Get transactions summary',
          tags: ['Transactions'],
          responses: {
            200: { description: 'Summary data retrieved' },
          },
        },
      },
      '/transactions/{id}': {
        get: {
          summary: 'Get transaction by ID',
          tags: ['Transactions'],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true, description: 'Transaction ID' }],
          responses: {
            200: { description: 'Transaction details', content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } } },
            404: { description: 'Transaction not found' },
          },
        },
        put: {
          summary: 'Update transaction',
          tags: ['Transactions'],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true }],
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Transaction' } } },
          },
          responses: {
            200: { description: 'Transaction updated' },
            404: { description: 'Transaction not found' },
          },
        },
        delete: {
          summary: 'Delete transaction',
          tags: ['Transactions'],
          parameters: [{ in: 'path', name: 'id', schema: { type: 'string' }, required: true }],
          responses: {
            200: { description: 'Transaction deleted' },
            404: { description: 'Transaction not found' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Path ke file routes jika Anda ingin menggunakan komentar JSDoc nanti
};

const specs = swaggerJsdoc(options);
export default specs;
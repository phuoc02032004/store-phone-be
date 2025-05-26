const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const zalopayRoutes = require('./routes/zalopayRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Enable CORS for all origins
app.use(cors());

// Body parser middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Store Phone Computer API',
      version: '1.0.0',
      description: 'API documentation for a store selling phones and computers',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/zaloPay', zalopayRoutes);
app.use('/api/products', reviewRoutes);

const PORT = process.env.PORT || 5000;

console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
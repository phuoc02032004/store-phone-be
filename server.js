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
const userCouponRoutes = require('./routes/userCouponRoutes');
const couponRoutes = require('./routes/couponRoutes');

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

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
  apis: ['./routes/*.js'], 
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/zaloPay', zalopayRoutes);
app.use('/api/products', reviewRoutes);
app.use('/api/user-coupons', userCouponRoutes);
app.use('/api/coupons', couponRoutes);

const PORT = process.env.PORT || 5000;

console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
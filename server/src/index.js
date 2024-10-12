const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Error Handler (should be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// src/server.js (diagnostic version)
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

// Replace these requires with your actual paths
const authRoutes = require('./routes/authRoutes'); // adjust name if different
const errorHandler = require('./middlewares/errorMiddleware.js'); // adjust if different
const courseRoutes = require('./routes/courseRoutes.js'); // Add this

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Diagnostic checks before mounting --- //
console.log('TYPE authRoutes:', typeof authRoutes, authRoutes && Object.prototype.toString.call(authRoutes));
console.log('TYPE errorHandler:', typeof errorHandler, errorHandler && Object.prototype.toString.call(errorHandler));

// If authRoutes is not a function, throw a clearer error
if (typeof authRoutes !== 'function' && !(authRoutes && authRoutes instanceof express.Router)) {
  console.error('ERROR: authRoutes is not a router/middleware function. Check src/routes/authRoutes.js export (should be module.exports = router).');
  // Do not try to use it to avoid crash; exit with helpful message:
  process.exit(1);
}

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes); 

// Health check
app.get('/', (req, res) => res.json({ message: 'CourseMaster API is running' }));

// Check errorHandler is a function
if (typeof errorHandler !== 'function') {
  console.error('ERROR: errorHandler is not a function. Check src/middlewares/errorHandler.js export (should module.exports = function (err, req, res, next) { ... }).');
  process.exit(1);
}

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
}
module.exports = app;

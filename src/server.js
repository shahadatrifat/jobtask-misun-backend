require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorMiddleware.js'); 
const courseRoutes = require('./routes/courseRoutes.js');

const app = express();
connectDB();

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://misun-task.netlify.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (typeof authRoutes !== 'function' && !(authRoutes && authRoutes instanceof express.Router)) {
  console.error('ERROR: authRoutes is not a router/middleware function. Check src/routes/authRoutes.js export (should be module.exports = router).');
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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
}
module.exports = app;

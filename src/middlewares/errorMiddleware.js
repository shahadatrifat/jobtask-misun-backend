// src/middlewares/errorHandler.js

// MUST export a single function, NOT an object
module.exports = (err, req, res, next) => {
  console.error("🔥 Error:", err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

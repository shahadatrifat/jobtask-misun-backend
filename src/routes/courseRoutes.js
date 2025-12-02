const express = require('express');
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getMyCourses,
  completeLesson,
} = require('../controllers/courseController');
const { protect, admin } = require('../middlewares/authMiddleware.js');

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Protected student routes
router.post('/:id/enroll', protect, enrollCourse);
router.post('/:id/complete-lesson', protect, completeLesson);
router.get('/my/enrolled', protect, getMyCourses);

// Admin routes
router.post('/', protect, admin, createCourse);
router.put('/:id', protect, admin, updateCourse);
router.delete('/:id', protect, admin, deleteCourse);

module.exports = router;
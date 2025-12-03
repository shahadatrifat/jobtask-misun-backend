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
} = require('../controllers/courseController.js');
const { protect, admin } = require('../middlewares/authMiddleware.js');
const router = express.Router();

// Public routes
router.get('/', getCourses);

// Protected student routes - PUT THESE BEFORE /:id
router.get('/my/enrolled', protect, getMyCourses);
router.post('/:id/enroll', protect, enrollCourse);
router.post('/:id/complete-lesson', protect, completeLesson);

// Admin routes
router.post('/', protect, admin, createCourse);
router.put('/:id', protect, admin, updateCourse);
router.delete('/:id', protect, admin, deleteCourse);

// Dynamic route - MUST BE LAST
router.get('/:id', getCourseById);

module.exports = router;
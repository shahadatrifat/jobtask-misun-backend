const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course.js');
const connectDB = require('../config/db.js');

dotenv.config();
connectDB();

const courses = [
  {
    title: 'Full Stack Web Development Bootcamp',
    description: 'Learn MERN stack from scratch. Build real-world projects and become a full-stack developer.',
    instructor: 'John Doe',
    price: 99,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    modules: [
      {
        title: 'Introduction to React',
        order: 1,
        lessons: [
          {
            title: 'What is React?',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 15,
            order: 1,
          },
          {
            title: 'Setting Up React Environment',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 20,
            order: 2,
          },
          {
            title: 'JSX and Components',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 25,
            order: 3,
          },
        ],
      },
      {
        title: 'Node.js Fundamentals',
        order: 2,
        lessons: [
          {
            title: 'Introduction to Node.js',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 18,
            order: 1,
          },
          {
            title: 'Working with Express',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 22,
            order: 2,
          },
        ],
      },
    ],
    batches: [
      {
        name: 'Batch 1 - January 2025',
        startDate: new Date('2025-01-15'),
      },
      {
        name: 'Batch 2 - March 2025',
        startDate: new Date('2025-03-01'),
      },
    ],
  },
  {
    title: 'Data Structures & Algorithms Masterclass',
    description: 'Master DSA for coding interviews at top tech companies. Includes 100+ practice problems.',
    instructor: 'Jane Smith',
    price: 149,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500',
    category: 'Computer Science',
    tags: ['DSA', 'Algorithms', 'Coding', 'Interview Prep'],
    modules: [
      {
        title: 'Arrays and Strings',
        order: 1,
        lessons: [
          {
            title: 'Array Basics',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 20,
            order: 1,
          },
          {
            title: 'Two Pointer Technique',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 25,
            order: 2,
          },
        ],
      },
    ],
    batches: [
      {
        name: 'Batch 1',
        startDate: new Date('2025-02-01'),
      },
    ],
  },
  {
    title: 'Machine Learning with Python',
    description: 'Complete guide to machine learning using Python, scikit-learn, and TensorFlow.',
    instructor: 'Dr. Michael Chen',
    price: 199,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500',
    category: 'Data Science',
    tags: ['Python', 'Machine Learning', 'AI', 'TensorFlow'],
    modules: [
      {
        title: 'Introduction to ML',
        order: 1,
        lessons: [
          {
            title: 'What is Machine Learning?',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 30,
            order: 1,
          },
        ],
      },
    ],
    batches: [],
  },
  {
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design.',
    instructor: 'Sarah Johnson',
    price: 79,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
    category: 'Design',
    tags: ['UI', 'UX', 'Design', 'Figma'],
    modules: [
      {
        title: 'Design Principles',
        order: 1,
        lessons: [
          {
            title: 'Color Theory',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 15,
            order: 1,
          },
          {
            title: 'Typography Basics',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 18,
            order: 2,
          },
        ],
      },
    ],
    batches: [],
  },
  {
    title: 'Digital Marketing Mastery',
    description: 'Complete guide to digital marketing including SEO, social media, and content marketing.',
    instructor: 'Alex Brown',
    price: 89,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
    category: 'Business',
    tags: ['Marketing', 'SEO', 'Social Media', 'Business'],
    modules: [
      {
        title: 'SEO Fundamentals',
        order: 1,
        lessons: [
          {
            title: 'Introduction to SEO',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 20,
            order: 1,
          },
        ],
      },
    ],
    batches: [],
  },
  {
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python. No prior experience required.',
    instructor: 'Emily Davis',
    price: 49,
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500',
    category: 'Web Development',
    tags: ['Python', 'Programming', 'Beginners'],
    modules: [
      {
        title: 'Python Basics',
        order: 1,
        lessons: [
          {
            title: 'Variables and Data Types',
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM',
            duration: 25,
            order: 1,
          },
        ],
      },
    ],
    batches: [],
  },
];

const seedCourses = async () => {
  try {
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log('Courses seeded successfully');
    process.exit();
  } catch (error) {
    console.error(' Error seeding courses:', error);
    process.exit(1);
  }
};

seedCourses();
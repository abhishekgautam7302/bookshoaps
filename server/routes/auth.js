// routes/auth.js
const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');
const { authenticateToken, isStudent, isTeacher } = require("../middleware/Auth");


router.post('/signup', signup);
router.post('/login', login);

// FIX: Return user data in protected routes
router.get('/user-auth', authenticateToken, isStudent, (req, res) => {
  res.status(200).json({ 
    ok: true, 
  });
});

router.get('/admin-auth', authenticateToken, isTeacher, (req, res) => {
  res.status(200).json({ 
    ok: true, 
  });
});



module.exports = router;
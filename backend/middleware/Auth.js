// middleware/Auth.js
const jwt = require('jsonwebtoken');
const pool = require('../config/database');


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    // FIX: Use the decoded token data directly (includes role)
    req.user = decoded;
    next();
  });
};

const isStudent = (req, res, next) => {

    if (req.user && req.user.role === "Student") {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Student role required.' });
    }
};

const isTeacher = (req, res, next) => {

    if (req.user && req.user.role === "Teacher") {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied. Teacher role required.' });
    }
};

module.exports = { authenticateToken, isStudent, isTeacher };
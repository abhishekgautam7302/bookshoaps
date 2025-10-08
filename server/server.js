// server.js
const express = require('express');
const cors = require('cors');
const Database = require('./config/database')
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();

// CORS - Render URL allow karo

app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://bookswapps.netlify.app'],
//   methods: ['GET','POST','PUT','DELETE','OPTIONS'], 
//   credentials: true, // agar cookies/auth use kar rahe ho
// }));


app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
Database.dbConnection();

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);

// Basic health check
app.get('/', (req, res) => res.json({ 
  ok: true, 
  message: 'Assignment Book API is running',
  timestamp: new Date().toISOString()
}));

// Serve frontend SPA with fallback
app.use(express.static(path.join(__dirname, '../portfolio/dist'), {
  index: false
}));

// SPA fallback - working approach
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(__dirname, '../portfolio/dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
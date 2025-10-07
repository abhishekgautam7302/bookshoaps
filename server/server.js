// app.js
const express = require('express');
const cors = require('cors');
const Database = require('./config/database')
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
Database.dbConnection();

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);

// Basic health check
app.get('/', (req, res) => res.json({ ok: true }));

// Serve frontend SPA with fallback
app.use(express.static(path.join(__dirname, '../portfolio/dist'), {
  index: false // Don't serve index.html for directories
}));

// SPA fallback - use a different approach
app.use((req, res, next) => {
  // If it's an API route that doesn't exist
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  // For all other non-API routes, serve the SPA
  res.sendFile(path.join(__dirname, '../portfolio/dist/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on ${port}`));
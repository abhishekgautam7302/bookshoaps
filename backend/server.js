// app.js
const express = require('express');
const cors = require('cors');
const pool = require("./config/database");
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
// const reqRoutes = require('./routes/requests');



const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/books', bookRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../portfolio/dist')));

    // All remaining requests return frontend
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../portfolio/dist/index.html'));
    });
}

// basic health
app.get('/', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on ${port}`));

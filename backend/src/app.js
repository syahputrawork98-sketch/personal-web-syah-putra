const express = require('express');
const cors = require('cors');
const { CLIENT_URL } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const publicProjectsRoutes = require('./routes/public/projects.routes');
const adminProjectsRoutes = require('./routes/admin/projects.routes');

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', publicProjectsRoutes);
app.use('/api/admin/projects', adminProjectsRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;

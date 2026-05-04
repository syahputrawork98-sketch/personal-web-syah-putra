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
const adminAccountRoutes = require('./routes/admin/account.routes');
const settingsRoutes = require('./routes/settings.routes');
const adminSettingsRoutes = require('./routes/admin/settings.routes');
const skillsRoutes = require('./routes/skills.routes');
const adminSkillsRoutes = require('./routes/admin/skills.routes');
const experienceRoutes = require('./routes/experience.routes');
const adminExperienceRoutes = require('./routes/admin/experience.routes');
const certificationRoutes = require('./routes/certification.routes');
const adminCertificationRoutes = require('./routes/admin/certification.routes');

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', publicProjectsRoutes);
app.use('/api/admin/projects', adminProjectsRoutes);
app.use('/api/admin/account', adminAccountRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/admin/skills', adminSkillsRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/admin/experiences', adminExperienceRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/admin/certifications', adminCertificationRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;

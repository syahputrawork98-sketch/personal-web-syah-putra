const express = require('express');
const router = express.Router();
const { login, getMe } = require('../controllers/auth.controller');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/login', login);
router.get('/me', requireAdmin, getMe);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getContact } = require('../controllers/settings.controller');

router.get('/contact', getContact);

module.exports = router;

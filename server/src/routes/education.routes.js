const express = require('express');
const router = express.Router();
const { getEducation } = require('../controllers/education.controller');

router.get('/', getEducation);

module.exports = router;

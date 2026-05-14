const express = require('express');
const router = express.Router();
const { getAllPublicExperiences } = require('../controllers/experience.controller');

router.get('/', getAllPublicExperiences);

module.exports = router;

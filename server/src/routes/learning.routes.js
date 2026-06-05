const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learning.controller');

router.get('/', learningController.getAllPublicLearningItems);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getAllPublicSkills } = require('../controllers/skills.controller');

router.get('/', getAllPublicSkills);

module.exports = router;

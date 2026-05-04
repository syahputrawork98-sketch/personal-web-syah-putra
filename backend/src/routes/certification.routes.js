const express = require('express');
const router = express.Router();
const { getAllPublicCertifications } = require('../controllers/certification.controller');

router.get('/', getAllPublicCertifications);

module.exports = router;

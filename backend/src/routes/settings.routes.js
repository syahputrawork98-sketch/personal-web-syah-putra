const express = require('express');
const router = express.Router();
const { getContact, getHero, getProfile } = require('../controllers/settings.controller');

router.get('/contact', getContact);
router.get('/hero', getHero);
router.get('/profile', getProfile);

module.exports = router;

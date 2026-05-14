const express = require('express');
const router = express.Router();
const { getAdminContact, updateContact, getAdminHero, updateHero, getAdminProfile, updateProfile } = require('../../controllers/settings.controller');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(requireAdmin);

router.get('/contact', getAdminContact);
router.put('/contact', updateContact);

router.get('/hero', getAdminHero);
router.put('/hero', updateHero);

router.get('/profile', getAdminProfile);
router.put('/profile', updateProfile);

module.exports = router;

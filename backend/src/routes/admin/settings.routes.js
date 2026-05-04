const express = require('express');
const router = express.Router();
const { getAdminContact, updateContact } = require('../../controllers/settings.controller');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(requireAdmin);

router.get('/contact', getAdminContact);
router.put('/contact', updateContact);

module.exports = router;

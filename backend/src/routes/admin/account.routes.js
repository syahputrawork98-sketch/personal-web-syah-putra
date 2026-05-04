const express = require('express');
const router = express.Router();
const { getAccount, updateEmail, updatePassword } = require('../../controllers/adminAccount.controller');
const requireAdmin = require('../../middleware/requireAdmin');

// Protect all routes
router.use(requireAdmin);

router.get('/', getAccount);
router.put('/email', updateEmail);
router.put('/password', updatePassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const cvBuilderController = require('../../controllers/adminCvBuilder.controller');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(requireAdmin);

router.get('/config', cvBuilderController.getConfig);
router.put('/config', cvBuilderController.updateConfig);

module.exports = router;

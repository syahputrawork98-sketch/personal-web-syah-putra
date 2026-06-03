const express = require('express');
const router = express.Router();
const cvBuilderController = require('../../controllers/adminCvBuilder.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.use(protect);

router.get('/config', cvBuilderController.getConfig);
router.put('/config', cvBuilderController.updateConfig);

module.exports = router;

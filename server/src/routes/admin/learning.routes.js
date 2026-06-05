const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../../middleware/auth.middleware');
const learningController = require('../../controllers/learning.controller');

router.use(requireAdmin);

router.get('/', learningController.getAllAdminLearningItems);
router.get('/:id', learningController.getLearningItemById);
router.post('/', learningController.createLearningItem);
router.put('/:id', learningController.updateLearningItem);
router.delete('/:id', learningController.deleteLearningItem);

module.exports = router;

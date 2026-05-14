const express = require('express');
const router = express.Router();
const {
  getAllAdminExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../../controllers/experience.controller');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(requireAdmin);

router.get('/', getAllAdminExperiences);
router.get('/:id', getExperienceById);
router.post('/', createExperience);
router.put('/:id', updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;

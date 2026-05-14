const express = require('express');
const router = express.Router();
const {
  getAllAdminSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} = require('../../controllers/skills.controller');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(requireAdmin);

router.get('/', getAllAdminSkills);
router.get('/:id', getSkillById);
router.post('/', createSkill);
router.put('/:id', updateSkill);
router.delete('/:id', deleteSkill);

module.exports = router;

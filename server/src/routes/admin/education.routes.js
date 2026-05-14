const express = require('express');
const router = express.Router();
const { 
  getAdminEducation, 
  getEducationById, 
  createEducation, 
  updateEducation, 
  deleteEducation 
} = require('../../controllers/education.controller');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(requireAdmin);

router.get('/', getAdminEducation);
router.get('/:id', getEducationById);
router.post('/', createEducation);
router.put('/:id', updateEducation);
router.delete('/:id', deleteEducation);

module.exports = router;

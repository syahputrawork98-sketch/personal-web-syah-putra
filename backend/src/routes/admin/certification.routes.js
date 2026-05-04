const express = require('express');
const router = express.Router();
const {
  getAllAdminCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
} = require('../../controllers/certification.controller');
const requireAdmin = require('../../middleware/requireAdmin');

router.use(requireAdmin);

router.get('/', getAllAdminCertifications);
router.get('/:id', getCertificationById);
router.post('/', createCertification);
router.put('/:id', updateCertification);
router.delete('/:id', deleteCertification);

module.exports = router;

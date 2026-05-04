const prisma = require('../lib/prisma');

// Public: Get all active education records
const getEducation = async (req, res, next) => {
  try {
    const education = await prisma.education.findMany({
      where: { isActive: true },
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    res.json({ education });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all education records
const getAdminEducation = async (req, res, next) => {
  try {
    const education = await prisma.education.findMany({
      orderBy: [
        { sortOrder: 'asc' },
        { createdAt: 'desc' }
      ]
    });
    res.json({ education });
  } catch (error) {
    next(error);
  }
};

// Admin: Get single education record
const getEducationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const education = await prisma.education.findUnique({
      where: { id }
    });
    if (!education) {
      return res.status(404).json({ message: 'Education record not found' });
    }
    res.json({ education });
  } catch (error) {
    next(error);
  }
};

// Admin: Create education record
const createEducation = async (req, res, next) => {
  const { school, degree, period, description, sortOrder, isActive } = req.body;
  try {
    const education = await prisma.education.create({
      data: {
        school,
        degree,
        period,
        description,
        sortOrder: parseInt(sortOrder) || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });
    res.status(201).json({ message: 'Education record created', education });
  } catch (error) {
    next(error);
  }
};

// Admin: Update education record
const updateEducation = async (req, res, next) => {
  const { id } = req.params;
  const { school, degree, period, description, sortOrder, isActive } = req.body;
  try {
    const education = await prisma.education.update({
      where: { id },
      data: {
        school,
        degree,
        period,
        description,
        sortOrder: parseInt(sortOrder) || 0,
        isActive: isActive !== undefined ? isActive : true
      }
    });
    res.json({ message: 'Education record updated', education });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete education record
const deleteEducation = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.education.delete({
      where: { id }
    });
    res.json({ message: 'Education record deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  getAdminEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation
};

const prisma = require('../lib/prisma');

// Public
const getAllPublicExperiences = async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        { order: 'asc' },
        { startDate: 'desc' },
      ],
    });

    res.json({ success: true, data: { experiences } });
  } catch (error) {
    next(error);
  }
};

// Admin
const getAllAdminExperiences = async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: [
        { order: 'asc' },
        { startDate: 'desc' },
      ],
    });

    res.json({ experiences });
  } catch (error) {
    next(error);
  }
};

const getExperienceById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const experience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!experience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found',
      });
    }

    res.json({ experience });
  } catch (error) {
    next(error);
  }
};

const createExperience = async (req, res, next) => {
  const { role, company, location, type, startDate, endDate, isCurrent, description, highlights, techStack, status, order } = req.body;

  if (!role || !company) {
    return res.status(400).json({
      status: 'error',
      message: 'Role and company are required',
    });
  }

  try {
    const experience = await prisma.experience.create({
      data: {
        role,
        company,
        location,
        type,
        startDate: startDate ? new Date(startDate) : null,
        endDate: isCurrent ? null : (endDate ? new Date(endDate) : null),
        isCurrent: isCurrent || false,
        description,
        highlights: highlights || [],
        techStack: techStack || [],
        status: status || 'DRAFT',
        order: parseInt(order) || 0,
      },
    });

    res.status(201).json({ experience });
  } catch (error) {
    next(error);
  }
};

const updateExperience = async (req, res, next) => {
  const { id } = req.params;
  const { role, company, location, type, startDate, endDate, isCurrent, description, highlights, techStack, status, order } = req.body;

  try {
    const existingExperience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existingExperience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found',
      });
    }

    const updatedExperience = await prisma.experience.update({
      where: { id },
      data: {
        role: role !== undefined ? role : existingExperience.role,
        company: company !== undefined ? company : existingExperience.company,
        location: location !== undefined ? location : existingExperience.location,
        type: type !== undefined ? type : existingExperience.type,
        startDate: startDate !== undefined ? (startDate ? new Date(startDate) : null) : existingExperience.startDate,
        endDate: isCurrent ? null : (endDate !== undefined ? (endDate ? new Date(endDate) : null) : existingExperience.endDate),
        isCurrent: isCurrent !== undefined ? isCurrent : existingExperience.isCurrent,
        description: description !== undefined ? description : existingExperience.description,
        highlights: highlights !== undefined ? highlights : existingExperience.highlights,
        techStack: techStack !== undefined ? techStack : existingExperience.techStack,
        status: status !== undefined ? status : existingExperience.status,
        order: order !== undefined ? parseInt(order) : existingExperience.order,
      },
    });

    res.json({ experience: updatedExperience });
  } catch (error) {
    next(error);
  }
};

const deleteExperience = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existingExperience = await prisma.experience.findUnique({
      where: { id },
    });

    if (!existingExperience) {
      return res.status(404).json({
        status: 'error',
        message: 'Experience not found',
      });
    }

    await prisma.experience.delete({
      where: { id },
    });

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPublicExperiences,
  getAllAdminExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};

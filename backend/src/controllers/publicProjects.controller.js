const prisma = require('../lib/prisma');

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({
      projects,
    });
  } catch (error) {
    next(error);
  }
};

const getProjectBySlug = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const project = await prisma.project.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
      },
    });

    if (!project) {
      return res.status(404).json({
        status: 'error',
        message: 'Project not found',
      });
    }

    res.json({
      project,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProjects,
  getProjectBySlug,
};

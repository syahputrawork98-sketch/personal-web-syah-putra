const prisma = require('../lib/prisma');

// Public
const getAllPublicSkills = async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      where: { visible: true },
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    res.json({ skills });
  } catch (error) {
    next(error);
  }
};

// Admin
const getAllAdminSkills = async (req, res, next) => {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    res.json({ skills });
  } catch (error) {
    next(error);
  }
};

const getSkillById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return res.status(404).json({
        status: 'error',
        message: 'Skill not found',
      });
    }

    res.json({ skill });
  } catch (error) {
    next(error);
  }
};

const createSkill = async (req, res, next) => {
  const { name, category, icon, level, order, visible } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'Skill name is required',
    });
  }

  try {
    const existingSkill = await prisma.skill.findUnique({
      where: { name },
    });

    if (existingSkill) {
      return res.status(409).json({
        status: 'error',
        message: 'Skill name already exists',
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        category,
        icon,
        level,
        order: parseInt(order) || 0,
        visible: visible !== undefined ? visible : true,
      },
    });

    res.status(201).json({ skill });
  } catch (error) {
    next(error);
  }
};

const updateSkill = async (req, res, next) => {
  const { id } = req.params;
  const { name, category, icon, level, order, visible } = req.body;

  try {
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Skill not found',
      });
    }

    if (name && name !== existingSkill.name) {
      const duplicateName = await prisma.skill.findUnique({
        where: { name },
      });

      if (duplicateName) {
        return res.status(409).json({
          status: 'error',
          message: 'Skill name already exists',
        });
      }
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name: name !== undefined ? name : existingSkill.name,
        category: category !== undefined ? category : existingSkill.category,
        icon: icon !== undefined ? icon : existingSkill.icon,
        level: level !== undefined ? level : existingSkill.level,
        order: order !== undefined ? parseInt(order) : existingSkill.order,
        visible: visible !== undefined ? visible : existingSkill.visible,
      },
    });

    res.json({ skill: updatedSkill });
  } catch (error) {
    next(error);
  }
};

const deleteSkill = async (req, res, next) => {
  const { id } = req.params;
  try {
    const existingSkill = await prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return res.status(404).json({
        status: 'error',
        message: 'Skill not found',
      });
    }

    await prisma.skill.delete({
      where: { id },
    });

    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPublicSkills,
  getAllAdminSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
};

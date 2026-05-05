const prisma = require('../lib/prisma');

// Public
const getAllPublicSkills = async (req, res, next) => {
  const { type } = req.query;
  try {
    const where = { visible: true };
    if (type) {
      where.type = type;
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { name: 'asc' },
      ],
    });

    res.json({ success: true, data: { skills } });
  } catch (error) {
    next(error);
  }
};

// Admin
const getAllAdminSkills = async (req, res, next) => {
  const { type } = req.query;
  try {
    const where = {};
    if (type) {
      where.type = type;
    }

    const skills = await prisma.skill.findMany({
      where,
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
  const { name, type, category, icon, level, description, order, visible } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'error',
      message: 'Skill name is required',
    });
  }

  // Basic validation for type enum
  const validTypes = ['TECHNICAL', 'SOFT', 'TOOL', 'LANGUAGE'];
  if (type && !validTypes.includes(type)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid skill type',
    });
  }

  try {
    const existingSkill = await prisma.skill.findUnique({
      where: { 
        name_type: { 
          name, 
          type: type || 'TECHNICAL' 
        } 
      },
    });

    if (existingSkill) {
      return res.status(409).json({
        status: 'error',
        message: 'Skill with this name and type already exists',
      });
    }

    const skill = await prisma.skill.create({
      data: {
        name,
        type: type || 'TECHNICAL',
        category,
        icon,
        level,
        description,
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
  const { name, type, category, icon, level, description, order, visible } = req.body;

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

    // Uniqueness check for name + type
    const newName = name !== undefined ? name : existingSkill.name;
    const newType = type !== undefined ? type : existingSkill.type;

    if (newName !== existingSkill.name || newType !== existingSkill.type) {
      const duplicate = await prisma.skill.findUnique({
        where: { 
          name_type: { 
            name: newName, 
            type: newType 
          } 
        },
      });

      if (duplicate) {
        return res.status(409).json({
          status: 'error',
          message: 'Skill with this name and type already exists',
        });
      }
    }

    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: {
        name: newName,
        type: newType,
        category: category !== undefined ? category : existingSkill.category,
        icon: icon !== undefined ? icon : existingSkill.icon,
        level: level !== undefined ? level : existingSkill.level,
        description: description !== undefined ? description : existingSkill.description,
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

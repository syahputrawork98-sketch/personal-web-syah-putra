const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllPublicLearningItems = async (req, res, next) => {
  try {
    const learningItems = await prisma.learningItem.findMany({
      where: {
        isPublished: true,
        NOT: {
          status: 'ARCHIVED'
        }
      },
      orderBy: [
        { orderIndex: 'asc' },
        { title: 'asc' }
      ]
    });
    res.json({ success: true, data: { learningItems } });
  } catch (error) {
    next(error);
  }
};

const getAllAdminLearningItems = async (req, res, next) => {
  try {
    const learningItems = await prisma.learningItem.findMany({
      orderBy: [
        { orderIndex: 'asc' },
        { title: 'asc' }
      ]
    });
    res.json({ success: true, data: { learningItems } });
  } catch (error) {
    next(error);
  }
};

const getLearningItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const learningItem = await prisma.learningItem.findUnique({
      where: { id }
    });
    if (!learningItem) {
      return res.status(404).json({ success: false, message: 'Learning item not found' });
    }
    res.json({ success: true, data: { learningItem } });
  } catch (error) {
    next(error);
  }
};

const createLearningItem = async (req, res, next) => {
  try {
    const { title, slug, category, status, level, description, topics, repoUrl, notesUrl, orderIndex, featured, isPublished } = req.body;
    
    if (!title || !slug || !category || !description) {
      return res.status(400).json({ success: false, message: 'Title, slug, category, and description are required' });
    }
    
    const validStatuses = ['PLANNED', 'LEARNING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];
    const itemStatus = validStatuses.includes(status) ? status : 'PLANNED';
    
    let topicsArray = [];
    if (Array.isArray(topics)) {
      topicsArray = topics;
    } else if (typeof topics === 'string') {
      topicsArray = topics.split(',').map(t => t.trim()).filter(Boolean);
    }
    
    const parsedOrderIndex = parseInt(orderIndex, 10) || 0;
    
    const learningItem = await prisma.learningItem.create({
      data: {
        title,
        slug,
        category,
        status: itemStatus,
        level: level || null,
        description,
        topics: topicsArray,
        repoUrl: repoUrl || null,
        notesUrl: notesUrl || null,
        orderIndex: parsedOrderIndex,
        featured: Boolean(featured),
        isPublished: Boolean(isPublished)
      }
    });
    
    res.status(201).json({ success: true, data: { learningItem } });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Slug already exists' });
    }
    next(error);
  }
};

const updateLearningItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, slug, category, status, level, description, topics, repoUrl, notesUrl, orderIndex, featured, isPublished } = req.body;
    
    const existing = await prisma.learningItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Learning item not found' });
    }
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (category !== undefined) updateData.category = category;
    if (description !== undefined) updateData.description = description;
    
    if (status !== undefined) {
      const validStatuses = ['PLANNED', 'LEARNING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'];
      if (validStatuses.includes(status)) updateData.status = status;
    }
    
    if (level !== undefined) updateData.level = level || null;
    if (repoUrl !== undefined) updateData.repoUrl = repoUrl || null;
    if (notesUrl !== undefined) updateData.notesUrl = notesUrl || null;
    if (featured !== undefined) updateData.featured = Boolean(featured);
    if (isPublished !== undefined) updateData.isPublished = Boolean(isPublished);
    if (orderIndex !== undefined) updateData.orderIndex = parseInt(orderIndex, 10) || 0;
    
    if (topics !== undefined) {
      if (Array.isArray(topics)) {
        updateData.topics = topics;
      } else if (typeof topics === 'string') {
        updateData.topics = topics.split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    
    const learningItem = await prisma.learningItem.update({
      where: { id },
      data: updateData
    });
    
    res.json({ success: true, data: { learningItem } });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ success: false, message: 'Slug already exists' });
    }
    next(error);
  }
};

const deleteLearningItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const existing = await prisma.learningItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Learning item not found' });
    }
    
    await prisma.learningItem.delete({
      where: { id }
    });
    
    res.json({ success: true, message: 'Learning item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPublicLearningItems,
  getAllAdminLearningItems,
  getLearningItemById,
  createLearningItem,
  updateLearningItem,
  deleteLearningItem
};

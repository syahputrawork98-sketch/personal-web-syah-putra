const prisma = require('../lib/prisma');

// Public
const getAllPublicCertifications = async (req, res, next) => {
  const { type, featured, issuer, category } = req.query;
  try {
    const where = { status: 'PUBLISHED' };
    
    if (type) {
      if (['CERTIFICATE', 'SUPPORTING_DOCUMENT'].includes(type)) {
        where.type = type;
      } else {
        // If invalid type passed, we can either ignore it or filter by category instead
        // For robustness, let's only set it if it matches the enum
      }
    }
    
    if (featured === 'true') where.featured = true;
    if (category) where.category = { contains: category, mode: 'insensitive' };
    if (issuer) where.issuer = { contains: issuer, mode: 'insensitive' };

    const certifications = await prisma.credential.findMany({
      where,
      orderBy: [
        { displayPriority: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({ success: true, data: { certifications } });
  } catch (error) {
    next(error);
  }
};

// Admin
const getAllAdminCertifications = async (req, res, next) => {
  const { type, featured, issuer, category } = req.query;
  try {
    const where = {};
    
    if (type) {
      if (['CERTIFICATE', 'SUPPORTING_DOCUMENT'].includes(type)) {
        where.type = type;
      }
    }

    if (featured === 'true') where.featured = true;
    if (category) where.category = { contains: category, mode: 'insensitive' };
    if (issuer) {
      where.issuer = { contains: issuer, mode: 'insensitive' };
    }

    const certifications = await prisma.credential.findMany({
      where,
      orderBy: [
        { displayPriority: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    res.json({ certifications });

  } catch (error) {
    next(error);
  }
};

const getCertificationById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const certification = await prisma.credential.findUnique({
      where: { id },
    });

    if (!certification) {
      return res.status(404).json({
        status: 'error',
        message: 'Certification not found',
      });
    }

    res.json({ certification });
  } catch (error) {
    next(error);
  }
};

const createCertification = async (req, res, next) => {
  const { 
    title, issuer, type, category, credentialId, credentialUrl, certificateUrl, 
    driveUrl, imageUrl, issuedAt, expiredAt, doesNotExpire, skills, description, 
    featured, status, order 
  } = req.body || {};

  if (!title || !issuer) {
    return res.status(400).json({
      status: 'error',
      message: 'Title and Issuer are required',
    });
  }

  try {
    const certification = await prisma.credential.create({
      data: {
        id: credentialId || `cert-${Date.now()}`,
        slug: title.toLowerCase().replace(/ /g, '-'),
        title,
        issuer,
        category: category || 'Other',
        type: type || 'CERTIFICATE',
        driveUrl,
        issueDate: issuedAt ? new Date(issuedAt) : null,
        endDate: expiredAt ? new Date(expiredAt) : null,
        skills: Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : []),
        summary: description || '',
        portfolioRelevance: 'Added via CMS',
        featured: featured === true || featured === 'true',
        displayPriority: parseInt(order) || 3,
        status: status || 'PUBLISHED',
        verificationStatus: 'VERIFIED'
      },
    });

    res.status(201).json({ certification });
  } catch (error) {
    next(error);
  }
};

const updateCertification = async (req, res, next) => {
  const { id } = req.params;
  const { 
    title, issuer, type, category, credentialId, credentialUrl, certificateUrl, 
    driveUrl, imageUrl, issuedAt, expiredAt, doesNotExpire, skills, description, 
    featured, status, order 
  } = req.body || {};

  try {
    const existing = await prisma.credential.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        status: 'error',
        message: 'Certification not found',
      });
    }

    const updated = await prisma.credential.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        issuer: issuer !== undefined ? issuer : existing.issuer,
        type: type !== undefined ? type : existing.type,
        category: category !== undefined ? category : existing.category,
        driveUrl: driveUrl !== undefined ? driveUrl : existing.driveUrl,
        issueDate: issuedAt !== undefined ? (issuedAt ? new Date(issuedAt) : null) : existing.issueDate,
        endDate: expiredAt !== undefined ? (expiredAt ? new Date(expiredAt) : null) : existing.endDate,
        skills: skills !== undefined ? (Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : [])) : existing.skills,
        summary: description !== undefined ? description : existing.summary,
        featured: featured !== undefined ? (featured === true || featured === 'true') : existing.featured,
        displayPriority: order !== undefined ? parseInt(order) : existing.displayPriority,
        status: status !== undefined ? status : existing.status,
      },
    });

    res.json({ certification: updated });
  } catch (error) {
    next(error);
  }
};

const deleteCertification = async (req, res, next) => {
  const { id } = req.params;
  try {
    await prisma.credential.delete({
      where: { id },
    });
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPublicCertifications,
  getAllAdminCertifications,
  getCertificationById,
  createCertification,
  updateCertification,
  deleteCertification,
};

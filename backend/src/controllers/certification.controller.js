const prisma = require('../lib/prisma');

// Public
const getAllPublicCertifications = async (req, res, next) => {
  const { type, featured, issuer } = req.query;
  try {
    const where = { status: 'PUBLISHED' };
    
    if (type) where.type = type;
    if (featured === 'true') where.featured = true;
    if (issuer) where.issuer = { contains: issuer, mode: 'insensitive' };

    const certifications = await prisma.certification.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { issuedAt: 'desc' },
      ],
    });

    res.json({ certifications });
  } catch (error) {
    next(error);
  }
};

// Admin
const getAllAdminCertifications = async (req, res, next) => {
  const { type, featured, issuer } = req.query;
  try {
    const where = {};
    
    if (type) where.type = type;
    if (featured === 'true') where.featured = true;
    if (issuer) {
      // User requested issuer=BNSP specifically or general issuer filter
      where.issuer = { contains: issuer, mode: 'insensitive' };
    }

    const certifications = await prisma.certification.findMany({
      where,
      orderBy: [
        { order: 'asc' },
        { issuedAt: 'desc' },
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
    const certification = await prisma.certification.findUnique({
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
  } = req.body;

  if (!title || !issuer) {
    return res.status(400).json({
      status: 'error',
      message: 'Title and Issuer are required',
    });
  }

  try {
    const certification = await prisma.certification.create({
      data: {
        title,
        issuer,
        type: type || 'TRAINING',
        category,
        credentialId,
        credentialUrl,
        certificateUrl,
        driveUrl,
        imageUrl,
        issuedAt: issuedAt ? new Date(issuedAt) : null,
        expiredAt: expiredAt ? new Date(expiredAt) : null,
        doesNotExpire: doesNotExpire === true || doesNotExpire === 'true',
        skills: Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : []),
        description,
        featured: featured === true || featured === 'true',
        status: status || 'DRAFT',
        order: parseInt(order) || 0,
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
  } = req.body;

  try {
    const existing = await prisma.certification.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        status: 'error',
        message: 'Certification not found',
      });
    }

    const updated = await prisma.certification.update({
      where: { id },
      data: {
        title: title !== undefined ? title : existing.title,
        issuer: issuer !== undefined ? issuer : existing.issuer,
        type: type !== undefined ? type : existing.type,
        category: category !== undefined ? category : existing.category,
        credentialId: credentialId !== undefined ? credentialId : existing.credentialId,
        credentialUrl: credentialUrl !== undefined ? credentialUrl : existing.credentialUrl,
        certificateUrl: certificateUrl !== undefined ? certificateUrl : existing.certificateUrl,
        driveUrl: driveUrl !== undefined ? driveUrl : existing.driveUrl,
        imageUrl: imageUrl !== undefined ? imageUrl : existing.imageUrl,
        issuedAt: issuedAt !== undefined ? (issuedAt ? new Date(issuedAt) : null) : existing.issuedAt,
        expiredAt: expiredAt !== undefined ? (expiredAt ? new Date(expiredAt) : null) : existing.expiredAt,
        doesNotExpire: doesNotExpire !== undefined ? (doesNotExpire === true || doesNotExpire === 'true') : existing.doesNotExpire,
        skills: skills !== undefined ? (Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(s => s.trim()).filter(s => s) : [])) : existing.skills,
        description: description !== undefined ? description : existing.description,
        featured: featured !== undefined ? (featured === true || featured === 'true') : existing.featured,
        status: status !== undefined ? status : existing.status,
        order: order !== undefined ? parseInt(order) : existing.order,
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
    await prisma.certification.delete({
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

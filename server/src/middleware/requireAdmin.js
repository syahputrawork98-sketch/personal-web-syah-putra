const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const prisma = require('../lib/prisma');

const requireAdmin = async (req, res, next) => {
  // Hardening F08C.2: Pastikan secret tersedia
  if (!JWT_SECRET) {
    return res.status(500).json({
      status: 'error',
      message: 'Server configuration error: JWT_SECRET is not defined.',
    });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      status: 'error',
      message: 'Authorization token missing or malformed',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
      },
    });

    if (!admin) {
      return res.status(401).json({
        status: 'error',
        message: 'Admin not found or unauthorized',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(401).json({
      status: 'error',
      message: 'Invalid or expired token',
    });
  }
};

module.exports = requireAdmin;

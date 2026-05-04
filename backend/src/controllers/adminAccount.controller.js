const bcrypt = require('bcryptjs');
const prisma = require('../lib/prisma');

const getAccount = async (req, res, next) => {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.admin.id },
      select: {
        id: true,
        email: true,
      },
    });

    if (!admin) {
      return res.status(404).json({
        status: 'error',
        message: 'Admin account not found',
      });
    }

    res.json({ admin });
  } catch (error) {
    next(error);
  }
};

const updateEmail = async (req, res, next) => {
  const { email, currentPassword } = req.body;

  if (!email || !currentPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'New email and current password are required',
    });
  }

  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.admin.id },
    });

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect current password',
      });
    }

    // Check if new email is taken by another admin
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existingAdmin && existingAdmin.id !== admin.id) {
      return res.status(409).json({
        status: 'error',
        message: 'Email is already in use',
      });
    }

    const updatedAdmin = await prisma.adminUser.update({
      where: { id: admin.id },
      data: { email },
      select: {
        id: true,
        email: true,
      },
    });

    res.json({
      message: 'Email updated successfully',
      admin: updatedAdmin,
    });
  } catch (error) {
    next(error);
  }
};

const updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'All password fields are required',
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      status: 'error',
      message: 'New password must be at least 8 characters long',
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      status: 'error',
      message: 'New password and confirmation do not match',
    });
  }

  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.admin.id },
    });

    const isPasswordValid = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect current password',
      });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { passwordHash },
    });

    res.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAccount,
  updateEmail,
  updatePassword,
};

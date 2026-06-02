const prisma = require('../lib/prisma');

// Public
const getContact = async (req, res, next) => {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'contact' },
    });

    res.json({
      success: true,
      data: { contact: setting ? setting.value : null }
    });
  } catch (error) {
    next(error);
  }
};

// Admin
const getAdminContact = async (req, res, next) => {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: 'contact' },
    });

    res.json({
      contact: setting ? setting.value : null,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { email, phone, whatsapp, github, linkedin, instagram, location } = req.body || {};

  try {
    const contactData = {
      email: email || '',
      phone: phone || '',
      whatsapp: whatsapp || '',
      github: github || '',
      linkedin: linkedin || '',
      instagram: instagram || '',
      location: location || '',
    };

    const setting = await prisma.siteSetting.upsert({
      where: { key: 'contact' },
      update: {
        value: contactData,
      },
      create: {
        key: 'contact',
        value: contactData,
      },
    });

    res.json({
      message: 'Contact settings updated successfully',
      contact: setting.value,
    });
  } catch (error) {
    next(error);
  }
};

const getHero = async (req, res, next) => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'hero' } });
    res.json({ success: true, data: { hero: setting ? setting.value : null } });
  } catch (error) { next(error); }
};

const getAdminHero = async (req, res, next) => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'hero' } });
    res.json({ hero: setting ? setting.value : null });
  } catch (error) { next(error); }
};

const updateHero = async (req, res, next) => {
  try {
    if (typeof req.body !== 'object' || req.body === null) {
      return res.status(400).json({ status: 'error', message: 'Body must be a JSON object' });
    }
    const setting = await prisma.siteSetting.upsert({
      where: { key: 'hero' },
      update: { value: req.body },
      create: { key: 'hero', value: req.body },
    });
    res.json({ message: 'Hero settings updated successfully', hero: setting.value });
  } catch (error) { next(error); }
};

const getProfile = async (req, res, next) => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'profile' } });
    res.json({ success: true, data: { profile: setting ? setting.value : null } });
  } catch (error) { next(error); }
};

const getAdminProfile = async (req, res, next) => {
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: 'profile' } });
    res.json({ profile: setting ? setting.value : null });
  } catch (error) { next(error); }
};

const updateProfile = async (req, res, next) => {
  try {
    if (typeof req.body !== 'object' || req.body === null) {
      return res.status(400).json({ status: 'error', message: 'Body must be a JSON object' });
    }
    const setting = await prisma.siteSetting.upsert({
      where: { key: 'profile' },
      update: { value: req.body },
      create: { key: 'profile', value: req.body },
    });
    res.json({ message: 'Profile settings updated successfully', profile: setting.value });
  } catch (error) { next(error); }
};

module.exports = {
  getContact,
  getAdminContact,
  updateContact,
  getHero,
  getAdminHero,
  updateHero,
  getProfile,
  getAdminProfile,
  updateProfile,
};

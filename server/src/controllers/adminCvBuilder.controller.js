const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CONFIG_KEY = 'CV_BUILDER_CONFIG';

const DEFAULT_CONFIG = {
  template: "classic-a4",
  sections: [
    { id: "profile", enabled: true, order: 1 },
    { id: "experience", enabled: true, order: 2, selectedIds: [] },
    { id: "education", enabled: true, order: 3, selectedIds: [] },
    { id: "skills", enabled: true, order: 4, selectedIds: [] },
    { id: "projects", enabled: true, order: 5, selectedIds: [] },
    { id: "credentials", enabled: false, order: 6, selectedIds: [] }
  ],
  summary: "",
  activeCvUrl: "",
  updatedAt: new Date().toISOString()
};

exports.getConfig = async (req, res) => {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: CONFIG_KEY }
    });

    let config = DEFAULT_CONFIG;
    if (setting && setting.value) {
      try {
        config = JSON.parse(setting.value);
      } catch (err) {
        console.error("Error parsing CV config JSON, using default.", err);
      }
    }

    return res.status(200).json({
      success: true,
      data: config
    });
  } catch (error) {
    console.error('Error fetching CV Builder Config:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch config'
    });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    const newConfig = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    const jsonString = JSON.stringify(newConfig);

    await prisma.setting.upsert({
      where: { key: CONFIG_KEY },
      update: { value: jsonString },
      create: { key: CONFIG_KEY, value: jsonString }
    });

    return res.status(200).json({
      success: true,
      message: 'CV configuration saved successfully',
      data: newConfig
    });
  } catch (error) {
    console.error('Error updating CV Builder Config:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to save config'
    });
  }
};

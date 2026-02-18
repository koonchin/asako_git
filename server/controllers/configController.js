const SiteConfig = require('../models/SiteConfig');

exports.getConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    
    if (!config) {
      config = await SiteConfig.create({});
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    
    if (!config) {
      config = await SiteConfig.create(req.body);
    } else {
      await config.update(req.body);
    }
    
    res.json({
      message: 'Config updated successfully',
      config,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
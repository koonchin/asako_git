const express = require('express');
const SiteConfig = require('../models/SiteConfig');
const I18nText = require('../models/I18nText');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all config (public)
router.get('/', async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    
    if (!config) {
      config = await SiteConfig.create({});
    }
    
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get complete site data including products, config, and i18n
router.get('/complete', async (req, res) => {
  try {
    const config = await SiteConfig.findOne();
    const Product = require('../models/Product');
    const products = await Product.findAll();
    
    const i18nTexts = await I18nText.findAll({
      order: [['category', 'ASC']],
    });
    
    // Format i18n
    const formatted = {};
    i18nTexts.forEach(text => {
      const [cat, key] = text.key_path.split('.');
      if (!formatted[cat]) formatted[cat] = {};
      formatted[cat][key] = {
        en: text.en,
        th: text.th,
        cn: text.cn,
      };
    });
    
    res.json({
      config,
      products,
      i18n: formatted,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update config (admin only)
router.put('/', authenticateToken, async (req, res) => {
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
});

module.exports = router;
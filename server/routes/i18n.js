const express = require('express');
const I18nText = require('../models/I18nText');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all i18n texts (public)
router.get('/texts', async (req, res) => {
  try {
    const texts = await I18nText.findAll({
      order: [['category', 'ASC'], ['key_path', 'ASC']],
    });
    
    // ✅ ต้องส่งแบบนี้เท่านั้นเพื่อให้ AdminI18nForm.tsx ทำงานได้
    res.json(texts); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get i18n texts by category
router.get('/texts/:category', async (req, res) => {
  try {
    const texts = await I18nText.findAll({
      where: { category: req.params.category },
    });
    res.json(texts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update i18n text (admin only)
router.put('/texts/:id', authenticateToken, async (req, res) => {
  try {
    const text = await I18nText.findByPk(req.params.id);
    if (!text) {
      return res.status(404).json({ error: 'Text not found' });
    }
    
    await text.update(req.body);
    res.json({
      message: 'Text updated successfully',
      text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create i18n text (admin only)
router.post('/texts', authenticateToken, async (req, res) => {
  try {
    const text = await I18nText.create(req.body);
    res.status(201).json({
      message: 'Text created successfully',
      text,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
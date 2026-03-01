const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticateToken } = require('../middleware/auth');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // ใช้ __dirname ชี้กลับไปที่โฟลเดอร์ uploads ที่ถูกต้องเสมอ
    const uploadDir = path.join(__dirname, '../uploads'); 
    if (!require('fs').existsSync(uploadDir)) {
      require('fs').mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024 },
  fileFilter,
});

router.post('/', authenticateToken, upload.single('image'), uploadController.uploadImage);
router.delete('/:filename', authenticateToken, uploadController.deleteImage);

module.exports = router;
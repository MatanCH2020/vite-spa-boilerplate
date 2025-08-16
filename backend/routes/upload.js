const express = require('express');
const multer = require('multer');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('רק קבצי תמונה מותרים'), false);
    }
  }
});

// Upload images for family member
router.post('/images', authenticateToken, upload.array('images', 50), async (req, res) => {
  try {
    const { member_id } = req.body;
    
    if (!member_id) {
      return res.status(400).json({ error: 'זיהוי בן המשפחה נדרש' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'לא נבחרו תמונות' });
    }

    // TODO: Upload to Cloudinary and save to database
    // For now, return success message
    res.json({
      message: `${req.files.length} תמונות הועלו בהצלחה`,
      uploaded_count: req.files.length,
      files: req.files.map(file => ({
        filename: file.originalname,
        size: file.size,
        mimetype: file.mimetype
      }))
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'שגיאה בהעלאת התמונות' });
  }
});

module.exports = router;
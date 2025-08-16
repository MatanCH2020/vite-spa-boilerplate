const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Generate album
router.post('/generate', authenticateToken, async (req, res) => {
  try {
    const { family_id, style } = req.body;
    
    if (!family_id || !style) {
      return res.status(400).json({ error: 'זיהוי המשפחה וסגנון נדרשים' });
    }

    // TODO: Implement album generation logic
    res.json({
      message: 'יצירת האלבום החלה',
      album_id: 'temp_album_' + Date.now(),
      estimated_time: '5-10 דקות'
    });
  } catch (error) {
    console.error('Album generation error:', error);
    res.status(500).json({ error: 'שגיאה ביצירת האלבום' });
  }
});

// Get completed album
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Get actual album from database
    res.json({
      id,
      family_id: 1,
      style: 'classic_portrait',
      status: 'completed',
      images: [
        'https://example.com/album1.jpg',
        'https://example.com/album2.jpg'
      ],
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get album error:', error);
    res.status(500).json({ error: 'שגיאה בקבלת האלבום' });
  }
});

module.exports = router;
const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Start LORA training
router.post('/start', authenticateToken, async (req, res) => {
  try {
    const { family_id, style } = req.body;
    
    if (!family_id) {
      return res.status(400).json({ error: 'זיהוי המשפחה נדרש' });
    }

    // TODO: Implement Replicate API integration for training
    res.json({
      message: 'האימון החל בהצלחה',
      training_id: 'temp_training_' + Date.now(),
      estimated_time: '15-20 דקות'
    });
  } catch (error) {
    console.error('Training start error:', error);
    res.status(500).json({ error: 'שגיאה בהפעלת האימון' });
  }
});

// Check training status
router.get('/status/:trainingId', authenticateToken, async (req, res) => {
  try {
    const { trainingId } = req.params;
    
    // TODO: Check actual training status from database/Replicate
    res.json({
      training_id: trainingId,
      status: 'in_progress',
      progress: 45,
      estimated_remaining: '8 דקות'
    });
  } catch (error) {
    console.error('Training status error:', error);
    res.status(500).json({ error: 'שגיאה בבדיקת סטטוס האימון' });
  }
});

module.exports = router;
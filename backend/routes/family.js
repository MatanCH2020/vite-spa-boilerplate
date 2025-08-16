const express = require('express');
const Family = require('../models/Family');
const FamilyMember = require('../models/FamilyMember');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Create new family project
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'שם המשפחה נדרש' });
    }

    const family = await Family.create({
      user_id: req.user.userId,
      name
    });

    res.status(201).json({
      message: 'פרויקט המשפחה נוצר בהצלחה',
      family
    });
  } catch (error) {
    console.error('Create family error:', error);
    res.status(500).json({ error: 'שגיאה ביצירת פרויקט המשפחה' });
  }
});

// Get user's families
router.get('/', authenticateToken, async (req, res) => {
  try {
    const families = await Family.findByUserId(req.user.userId);
    res.json({ families });
  } catch (error) {
    console.error('Get families error:', error);
    res.status(500).json({ error: 'שגיאה בקבלת רשימת המשפחות' });
  }
});

// Get specific family with members
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const family = await Family.getWithMembers(req.params.id);
    
    if (!family) {
      return res.status(404).json({ error: 'המשפחה לא נמצאה' });
    }

    // Check if user owns this family
    if (family.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'אין לך הרשאה לצפות במשפחה זו' });
    }

    res.json({ family });
  } catch (error) {
    console.error('Get family error:', error);
    res.status(500).json({ error: 'שגיאה בקבלת פרטי המשפחה' });
  }
});

// Add family member
router.post('/:id/members', authenticateToken, async (req, res) => {
  try {
    const { name, role } = req.body;
    const familyId = req.params.id;

    if (!name) {
      return res.status(400).json({ error: 'שם בן המשפחה נדרש' });
    }

    // Check if family exists and belongs to user
    const family = await Family.findById(familyId);
    if (!family) {
      return res.status(404).json({ error: 'המשפחה לא נמצאה' });
    }

    if (family.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'אין לך הרשאה לערוך משפחה זו' });
    }

    const member = await FamilyMember.create({
      family_id: familyId,
      name,
      role: role || 'member'
    });

    res.status(201).json({
      message: 'בן המשפחה נוסף בהצלחה',
      member
    });
  } catch (error) {
    console.error('Add family member error:', error);
    res.status(500).json({ error: 'שגיאה בהוספת בן המשפחה' });
  }
});

// Update family member
router.put('/members/:memberId', authenticateToken, async (req, res) => {
  try {
    const { name, role } = req.body;
    const memberId = req.params.memberId;

    // Get member and check ownership
    const member = await FamilyMember.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'בן המשפחה לא נמצא' });
    }

    const family = await Family.findById(member.family_id);
    if (family.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'אין לך הרשאה לערוך בן משפחה זה' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (role) updates.role = role;

    const updatedMember = await FamilyMember.update(memberId, updates);

    res.json({
      message: 'פרטי בן המשפחה עודכנו בהצלחה',
      member: updatedMember
    });
  } catch (error) {
    console.error('Update family member error:', error);
    res.status(500).json({ error: 'שגיאה בעדכון פרטי בן המשפחה' });
  }
});

// Delete family member
router.delete('/members/:memberId', authenticateToken, async (req, res) => {
  try {
    const memberId = req.params.memberId;

    // Get member and check ownership
    const member = await FamilyMember.findById(memberId);
    if (!member) {
      return res.status(404).json({ error: 'בן המשפחה לא נמצא' });
    }

    const family = await Family.findById(member.family_id);
    if (family.user_id !== req.user.userId) {
      return res.status(403).json({ error: 'אין לך הרשאה למחוק בן משפחה זה' });
    }

    await FamilyMember.delete(memberId);

    res.json({ message: 'בן המשפחה נמחק בהצלחה' });
  } catch (error) {
    console.error('Delete family member error:', error);
    res.status(500).json({ error: 'שגיאה במחיקת בן המשפחה' });
  }
});

module.exports = router;
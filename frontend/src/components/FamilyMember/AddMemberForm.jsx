import React, { useState } from 'react';
import './AddMemberForm.css';

const FAMILY_ROLES = {
  dad: { label: 'אבא', icon: '👨' },
  mom: { label: 'אמא', icon: '👩' },
  son: { label: 'בן', icon: '👦' },
  daughter: { label: 'בת', icon: '👧' },
  grandfather: { label: 'סבא', icon: '👴' },
  grandmother: { label: 'סבתא', icon: '👵' },
  member: { label: 'בן משפחה', icon: '👤' }
};

const AddMemberForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'member'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', role: 'member' });
    } catch (error) {
      // Error handled by parent
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleKey) => {
    setFormData({ ...formData, role: roleKey });
  };

  return (
    <div className="add-member-form">
      <div className="form-header">
        <h2>הוספת בן משפחה חדש</h2>
        <button 
          onClick={onCancel}
          className="close-btn"
          disabled={loading}
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="memberName">שם בן המשפחה</label>
          <input
            type="text"
            id="memberName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="הכנס שם..."
            required
            disabled={loading}
            autoFocus
          />
        </div>

        <div className="form-group">
          <label>תפקיד במשפחה</label>
          <div className="role-selector">
            {Object.entries(FAMILY_ROLES).map(([key, role]) => (
              <button
                key={key}
                type="button"
                className={`role-option ${formData.role === key ? 'selected' : ''}`}
                onClick={() => handleRoleSelect(key)}
                disabled={loading}
              >
                <span className="role-icon">{role.icon}</span>
                <span className="role-label">{role.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit"
            className="submit-btn"
            disabled={loading || !formData.name.trim()}
          >
            {loading ? 'מוסיף...' : 'הוסף בן משפחה'}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="cancel-btn"
            disabled={loading}
          >
            ביטול
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberForm;
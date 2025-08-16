import React, { useState } from 'react';
import './FamilyMemberCard.css';

const FAMILY_ROLES = {
  dad: { label: 'אבא', icon: '👨' },
  mom: { label: 'אמא', icon: '👩' },
  son: { label: 'בן', icon: '👦' },
  daughter: { label: 'בת', icon: '👧' },
  grandfather: { label: 'סבא', icon: '👴' },
  grandmother: { label: 'סבתא', icon: '👵' },
  member: { label: 'בן משפחה', icon: '👤' }
};

const FamilyMemberCard = ({ member, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: member.name, role: member.role });
  const [loading, setLoading] = useState(false);

  const roleInfo = FAMILY_ROLES[member.role] || FAMILY_ROLES.member;

  const handleSave = async () => {
    if (!editData.name.trim()) return;
    
    setLoading(true);
    try {
      await onUpdate(member.id, editData);
      setIsEditing(false);
    } catch (error) {
      // Error handled by parent
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({ name: member.name, role: member.role });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(member.id);
  };

  return (
    <div className="family-member-card">
      <div className="member-avatar">
        <span className="avatar-icon">{roleInfo.icon}</span>
      </div>
      
      <div className="member-info">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              placeholder="שם בן המשפחה"
              className="edit-name-input"
              disabled={loading}
            />
            <select
              value={editData.role}
              onChange={(e) => setEditData({ ...editData, role: e.target.value })}
              className="edit-role-select"
              disabled={loading}
            >
              {Object.entries(FAMILY_ROLES).map(([key, role]) => (
                <option key={key} value={key}>
                  {role.icon} {role.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="member-details">
            <h3 className="member-name">{member.name}</h3>
            <span className="member-role">{roleInfo.label}</span>
          </div>
        )}
      </div>

      <div className="member-actions">
        {isEditing ? (
          <div className="edit-actions">
            <button 
              onClick={handleSave}
              className="save-btn"
              disabled={loading || !editData.name.trim()}
            >
              {loading ? '...' : '✓'}
            </button>
            <button 
              onClick={handleCancel}
              className="cancel-btn"
              disabled={loading}
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="view-actions">
            <button 
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              title="ערוך"
            >
              ✏️
            </button>
            <button 
              onClick={handleDelete}
              className="delete-btn"
              title="מחק"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <div className="member-status">
        <div className="images-count">
          <span className="count-number">0</span>
          <span className="count-label">תמונות</span>
        </div>
        <div className="status-indicator pending">
          <span className="status-dot"></span>
          <span className="status-text">ממתין לתמונות</span>
        </div>
      </div>
    </div>
  );
};

export default FamilyMemberCard;
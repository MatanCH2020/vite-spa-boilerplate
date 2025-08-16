import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { familyAPI } from '../services/api';
import FamilyMemberCard from '../components/FamilyMember/FamilyMemberCard';
import AddMemberForm from '../components/FamilyMember/AddMemberForm';
import './FamilyManagementPage.css';

const FamilyManagementPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, actions } = useApp();
  const [showAddMember, setShowAddMember] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFamily();
  }, [id]);

  const loadFamily = async () => {
    try {
      setLoading(true);
      const response = await familyAPI.getById(id);
      actions.setCurrentFamily(response.data.family);
    } catch (error) {
      actions.setError('שגיאה בטעינת פרטי המשפחה');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (memberData) => {
    try {
      const response = await familyAPI.addMember(id, memberData);
      actions.addFamilyMember(response.data.member);
      setShowAddMember(false);
    } catch (error) {
      actions.setError('שגיאה בהוספת בן המשפחה');
    }
  };

  const handleUpdateMember = async (memberId, memberData) => {
    try {
      const response = await familyAPI.updateMember(memberId, memberData);
      actions.updateFamilyMember(response.data.member);
    } catch (error) {
      actions.setError('שגיאה בעדכון פרטי בן המשפחה');
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק את בן המשפחה?')) {
      return;
    }

    try {
      await familyAPI.deleteMember(memberId);
      actions.removeFamilyMember(memberId);
    } catch (error) {
      actions.setError('שגיאה במחיקת בן המשפחה');
    }
  };

  const canProceedToUpload = () => {
    return state.currentFamily?.members?.length >= 1;
  };

  const handleProceedToUpload = () => {
    navigate(`/upload/${id}`);
  };

  if (loading) {
    return <div className="loading-page">טוען פרטי המשפחה...</div>;
  }

  if (!state.currentFamily) {
    return <div className="error-page">המשפחה לא נמצאה</div>;
  }

  const { currentFamily } = state;
  const members = currentFamily.members || [];

  return (
    <div className="family-management-page">
      <div className="container">
        <header className="page-header">
          <div className="header-content">
            <h1>{currentFamily.name}</h1>
            <p>הוסיפו את בני המשפחה שלכם לאלבום</p>
          </div>
          <div className="header-stats">
            <div className="stat">
              <span className="stat-number">{members.length}</span>
              <span className="stat-label">בני משפחה</span>
            </div>
          </div>
        </header>

        <div className="members-section">
          <div className="section-header">
            <h2>בני המשפחה</h2>
            <button 
              onClick={() => setShowAddMember(true)}
              className="add-member-btn"
            >
              <span>➕</span>
              הוסף בן משפחה
            </button>
          </div>

          {showAddMember && (
            <div className="add-member-overlay">
              <div className="add-member-modal">
                <AddMemberForm
                  onSubmit={handleAddMember}
                  onCancel={() => setShowAddMember(false)}
                />
              </div>
            </div>
          )}

          <div className="members-grid">
            {members.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👨‍👩‍👧‍👦</div>
                <h3>עדיין לא הוספתם בני משפחה</h3>
                <p>התחילו בלחיצה על "הוסף בן משפחה"</p>
                <button 
                  onClick={() => setShowAddMember(true)}
                  className="empty-action-btn"
                >
                  הוסף את בן המשפחה הראשון
                </button>
              </div>
            ) : (
              members.map(member => (
                <FamilyMemberCard
                  key={member.id}
                  member={member}
                  onUpdate={handleUpdateMember}
                  onDelete={handleDeleteMember}
                />
              ))
            )}
          </div>
        </div>

        {members.length > 0 && (
          <div className="next-step-section">
            <div className="next-step-card">
              <h3>מוכנים לשלב הבא?</h3>
              <p>
                עכשיו נצטרך להעלות תמונות של כל בן משפחה. 
                מומלץ לפחות 20 תמונות לכל אדם לתוצאות מיטביות.
              </p>
              <button 
                onClick={handleProceedToUpload}
                className="proceed-btn"
                disabled={!canProceedToUpload()}
              >
                המשך להעלאת תמונות ←
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FamilyManagementPage;
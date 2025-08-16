import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { state } = useApp();
  
  // If still loading, show loading state
  if (state.loading) {
    return <div className="loading-overlay">טוען...</div>;
  }
  
  // If not authenticated, redirect to login
  if (!state.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated, render children
  return children;
};

export default ProtectedRoute;
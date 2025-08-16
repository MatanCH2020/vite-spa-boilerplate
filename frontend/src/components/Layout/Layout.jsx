import React from 'react';
import { useApp } from '../../context/AppContext';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }) => {
  const { state } = useApp();

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {state.loading && <div className="loading-overlay">טוען...</div>}
        {children}
      </main>
    </div>
  );
};

export default Layout;
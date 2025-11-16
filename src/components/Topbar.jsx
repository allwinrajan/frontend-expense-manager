// Topbar component placeholder
import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import ThemeToggle from './ThemeToggle.jsx';

const Topbar = () => {
  const username = localStorage.getItem('username') || '';
  const { mode } = useTheme();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">Overview</h1>
        <span className="topbar-subtitle">Welcome back{username && `, ${username}`}</span>
      </div>
      <div className="topbar-right">
        <span className="mode-label">{mode === 'dark' ? 'Dark' : 'Light'} mode</span>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Topbar;

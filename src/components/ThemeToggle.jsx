// ThemeToggle component placeholder
import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {mode === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  );
};

export default ThemeToggle;

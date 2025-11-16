// Sidebar component placeholder
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="logo">Expense<span className="accent">Manager</span></span>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/app/dashboard" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="/app/budget" className="nav-link">
          Budget
        </NavLink>
        <NavLink to="/app/expenses" className="nav-link">
          Expenses
        </NavLink>
      </nav>
      <button className="sidebar-logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;

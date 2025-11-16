// Layout component placeholder
import React from 'react';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

const Layout = ({ children }) => {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="app-main">
        <Topbar />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

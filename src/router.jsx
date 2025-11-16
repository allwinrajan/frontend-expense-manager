// router.jsx placeholder
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Budget from './pages/Budget.jsx';
import Expenses from './pages/Expenses.jsx';
import Layout from './components/Layout.jsx';

function isAuthenticated() {
  const token = localStorage.getItem('token');
  return !!token;
}

const ProtectedRoute = () => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return <Outlet />;
};

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute />}>
      <Route
        path="/app"
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="budget" element={<Budget />} />
        <Route path="expenses" element={<Expenses />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default AppRouter;

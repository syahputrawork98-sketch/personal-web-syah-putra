import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/admin/AdminAuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAdminAuth();

  if (loading) return <div>Loading...</div>;

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;

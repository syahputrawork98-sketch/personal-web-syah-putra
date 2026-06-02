import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../lib/auth';

const ProtectedRoute = ({ children }) => {
  // Catatan F08C.1: Validasi ini saat ini hanya mengecek ketersediaan token di frontend.
  // Validasi JWT server-side akan diaktifkan setelah backend auth (F08) berjalan penuh.
  const token = getToken();

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

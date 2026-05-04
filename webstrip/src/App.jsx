import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminProjects from './pages/admin/AdminProjects';
import ProjectForm from './pages/admin/ProjectForm';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AdminAuthProvider } from './context/admin/AdminAuthContext';

function App() {
  return (
    <Router>
      <AdminAuthProvider>
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin/projects" 
              element={
                <ProtectedRoute>
                  <AdminProjects />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/projects/new" 
              element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/projects/edit/:id" 
              element={
                <ProtectedRoute>
                  <ProjectForm />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </MainLayout>
      </AdminAuthProvider>
    </Router>
  );
}

export default App;

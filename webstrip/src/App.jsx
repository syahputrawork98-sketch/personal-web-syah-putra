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
import AdminProjectCreate from './pages/admin/AdminProjectCreate';
import AdminProjectEdit from './pages/admin/AdminProjectEdit';
import AdminAccount from './pages/admin/AdminAccount';
import AdminContact from './pages/admin/AdminContact';
import AdminSkills from './pages/admin/AdminSkills';
import AdminSkillCreate from './pages/admin/AdminSkillCreate';
import AdminSkillEdit from './pages/admin/AdminSkillEdit';
import AdminExperiences from './pages/admin/AdminExperiences';
import AdminExperienceCreate from './pages/admin/AdminExperienceCreate';
import AdminExperienceEdit from './pages/admin/AdminExperienceEdit';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/about" element={<MainLayout><About /></MainLayout>} />
        <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
        <Route path="/experience" element={<MainLayout><Experience /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />

        {/* Admin Login - No Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard Routes - Protected */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminProjects />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectCreate />} />
          <Route path="projects/:id/edit" element={<AdminProjectEdit />} />
          <Route path="account" element={<AdminAccount />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="skills/new" element={<AdminSkillCreate />} />
          <Route path="skills/:id/edit" element={<AdminSkillEdit />} />
          <Route path="experience" element={<AdminExperiences />} />
          <Route path="experience/new" element={<AdminExperienceCreate />} />
          <Route path="experience/:id/edit" element={<AdminExperienceEdit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

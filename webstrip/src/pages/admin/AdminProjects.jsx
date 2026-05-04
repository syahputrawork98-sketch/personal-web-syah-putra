import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../context/admin/AdminAuthContext';
import { motion } from 'framer-motion';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAdminAuth();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        alert('Error deleting project');
      }
    }
  };

  return (
    <div className="section-padding">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
          <h1>Manage Projects</h1>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <Link to="/admin/projects/new" className="btn btn-primary">+ Add New</Link>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          </div>
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="card" style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <th style={{ padding: 'var(--space-4)' }}>Title (ID)</th>
                  <th style={{ padding: 'var(--space-4)' }}>Status</th>
                  <th style={{ padding: 'var(--space-4)' }}>Featured</th>
                  <th style={{ padding: 'var(--space-4)' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: 'var(--space-4)' }}>{project.title?.id || project.title?.en}</td>
                    <td style={{ padding: 'var(--space-4)' }}>
                      <span className="tech-badge">{project.status}</span>
                    </td>
                    <td style={{ padding: 'var(--space-4)' }}>{project.featured ? '⭐' : '-'}</td>
                    <td style={{ padding: 'var(--space-4)', display: 'flex', gap: 'var(--space-2)' }}>
                      <Link to={`/admin/projects/edit/${project.id}`} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Edit</Link>
                      <button onClick={() => handleDelete(project.id)} className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.8rem', color: '#ef4444' }}>Delete</button>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ padding: 'var(--space-8)', textAlign: 'center', opacity: 0.5 }}>No projects found. Create your first one!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProjects;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminProjects, deleteProject } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAdminProjects();
      setProjects(data.projects);
      setError('');
    } catch (err) {
      if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
        removeToken();
        navigate('/admin/login');
      } else {
        setError(err.message || 'Failed to load projects');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete project: "${title}"?`)) {
      try {
        await deleteProject(id);
        fetchProjects(); // Refresh list
      } catch (err) {
        alert(err.message || 'Failed to delete project');
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading projects...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h1>Manage Projects</h1>
        <Link to="/admin/projects/new" className="btn btn-primary">
          + Add Project
        </Link>
      </div>

      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-6)' }}>
          {error}
        </div>
      )}

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: 'var(--space-3)' }}>Title</th>
              <th style={{ padding: 'var(--space-3)' }}>Status</th>
              <th style={{ padding: 'var(--space-3)' }}>Featured</th>
              <th style={{ padding: 'var(--space-3)' }}>Order</th>
              <th style={{ padding: 'var(--space-3)' }}>Last Updated</th>
              <th style={{ padding: 'var(--space-3)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: 'var(--space-8)', textAlign: 'center', opacity: 0.6 }}>No projects found.</td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} style={{ borderBottom: '1px solid var(--border-color)', opacity: project.status === 'DRAFT' ? 0.7 : 1 }}>
                  <td style={{ padding: 'var(--space-3)', fontWeight: 'bold' }}>{project.title}</td>
                  <td style={{ padding: 'var(--space-3)' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      backgroundColor: project.status === 'PUBLISHED' ? '#dcfce7' : '#f3f4f6',
                      color: project.status === 'PUBLISHED' ? '#166534' : '#374151'
                    }}>
                      {project.status}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--space-3)' }}>{project.featured ? '⭐ Yes' : 'No'}</td>
                  <td style={{ padding: 'var(--space-3)' }}>{project.order}</td>
                  <td style={{ padding: 'var(--space-3)', fontSize: '0.85rem', opacity: 0.8 }}>
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: 'var(--space-3)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link 
                        to={`/admin/projects/${project.id}/edit`} 
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(project.id, project.title)}
                        className="btn btn-secondary" 
                        style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#dc2626' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProjects;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../../components/admin/ProjectForm';
import { createProject } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminProjectCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    setError('');

    try {
      await createProject(data);
      navigate('/admin/projects');
    } catch (err) {
      if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
        removeToken();
        navigate('/admin/login');
      } else {
        setError(err.message || 'Failed to create project');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-6)' }}>Create New Project</h1>
      
      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-6)' }}>
          {error}
        </div>
      )}

      <ProjectForm 
        onSubmit={handleSubmit} 
        onCancel={() => navigate('/admin/projects')}
        loading={loading}
      />
    </div>
  );
};

export default AdminProjectCreate;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExperience } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import ExperienceForm from '../../components/admin/ExperienceForm';

const AdminExperienceCreate = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');
    try {
      await createExperience(formData);
      navigate('/admin/experience');
    } catch (err) {
      if (err.message.includes('401')) {
        removeToken();
        navigate('/admin/login');
      } else {
        setError(err.message);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Add New Experience</h1>
      {error && <div style={{ color: 'red', marginBottom: 'var(--space-4)' }}>{error}</div>}
      <ExperienceForm onSubmit={handleSubmit} saving={saving} />
    </div>
  );
};

export default AdminExperienceCreate;

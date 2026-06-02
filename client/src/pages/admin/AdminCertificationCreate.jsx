import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCertification } from '../../lib/api';
import CertificationForm from '../../components/admin/CertificationForm';
import { removeToken } from '../../lib/auth';

const AdminCertificationCreate = () => {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');
    try {
      await createCertification(formData);
      navigate('/admin/certifications');
    } catch (err) {
      if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
        removeToken();
        navigate('/admin/login');
      } else {
        setError(err.message);
      }
      setSaving(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: 'var(--space-4)' }}>&larr; Back</button>
        <h1>Add New Certification</h1>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 'var(--space-4)', padding: '12px', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

      <CertificationForm onSubmit={handleSubmit} saving={saving} />
    </div>
  );
};

export default AdminCertificationCreate;

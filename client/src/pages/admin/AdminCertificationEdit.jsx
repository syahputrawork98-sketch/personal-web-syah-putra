import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdminCertification, updateCertification } from '../../lib/api';
import CertificationForm from '../../components/admin/CertificationForm';
import { removeToken } from '../../lib/auth';

const AdminCertificationEdit = () => {
  const { id } = useParams();
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        const data = await getAdminCertification(id);
        setCertification(data.certification);
      } catch (err) {
        if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
          removeToken();
          navigate('/admin/login');
        } else {
        }
      } finally {
        setLoading(false);
      }
    };
    fetchCertification();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');
    try {
      await updateCertification(id, formData);
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

  if (loading) return <div className="container" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading...</div>;
  if (!certification && !loading) return <div className="container">Certification not found.</div>;

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <button onClick={() => navigate(-1)} className="btn btn-secondary" style={{ marginBottom: 'var(--space-4)' }}>&larr; Back</button>
        <h1>Edit Certification</h1>
        <p style={{ opacity: 0.7 }}>Editing: {certification.title}</p>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 'var(--space-4)', padding: '12px', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

      <CertificationForm initialData={certification} onSubmit={handleSubmit} saving={saving} />
    </div>
  );
};

export default AdminCertificationEdit;

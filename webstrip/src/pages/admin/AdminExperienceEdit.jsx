import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdminExperience, updateExperience } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import ExperienceForm from '../../components/admin/ExperienceForm';

const AdminExperienceEdit = () => {
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await getAdminExperience(id);
        setExperience(data.experience);
      } catch (err) {
        if (err.message.includes('401')) {
          removeToken();
          navigate('/admin/login');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');
    try {
      await updateExperience(id, formData);
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

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading experience details...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Edit Experience</h1>
      {error && <div style={{ color: 'red', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {experience && <ExperienceForm initialData={experience} onSubmit={handleSubmit} saving={saving} />}
    </div>
  );
};

export default AdminExperienceEdit;

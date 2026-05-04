import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdminSkill, updateSkill } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import SkillForm from '../../components/admin/SkillForm';

const AdminSkillEdit = () => {
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const data = await getAdminSkill(id);
        setSkill(data.skill);
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
    fetchSkill();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    setError('');
    try {
      await updateSkill(id, formData);
      navigate('/admin/skills');
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

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading skill details...</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: 'var(--space-8)' }}>Edit Skill</h1>
      {error && <div style={{ color: 'red', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {skill && <SkillForm initialData={skill} onSubmit={handleSubmit} saving={saving} />}
    </div>
  );
};

export default AdminSkillEdit;

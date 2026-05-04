import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminSkills, deleteSkill } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const data = await getAdminSkills();
      setSkills(data.skills);
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

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteSkill(id);
        fetchSkills();
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading skills...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1>Manage Skills</h1>
        <Link to="/admin/skills/new" className="btn btn-primary">Add New Skill</Link>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 'var(--space-4)' }}>{error}</div>}

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Order</th>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Category</th>
              <th style={{ padding: '12px' }}>Level</th>
              <th style={{ padding: '12px' }}>Visible</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>{skill.order}</td>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{skill.name}</td>
                <td style={{ padding: '12px' }}>{skill.category || '-'}</td>
                <td style={{ padding: '12px' }}>{skill.level || '-'}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    backgroundColor: skill.visible ? '#dcfce7' : '#f3f4f6',
                    color: skill.visible ? '#166534' : '#374151'
                  }}>
                    {skill.visible ? 'Visible' : 'Hidden'}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <Link to={`/admin/skills/${skill.id}/edit`} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Edit</Link>
                    <button 
                      onClick={() => handleDelete(skill.id, skill.name)} 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#dc2626' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {skills.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: 'var(--space-8)', textAlign: 'center', opacity: 0.5 }}>No skills found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSkills;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminExperiences, deleteExperience } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import ConfirmModal from '../../components/admin/ConfirmModal';

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchExperiences = async () => {
    try {
      const data = await getAdminExperiences();
      setExperiences(data.experiences);
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
    fetchExperiences();
  }, []);

  const handleDeleteClick = (id, role, company) => {
    setDeleteModal({ isOpen: true, id, title: `${role} at ${company}` });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError('');
    setSuccessMsg('');
    try {
      await deleteExperience(deleteModal.id);
      setSuccessMsg(`Experience "${deleteModal.title}" deleted successfully.`);
      setDeleteModal({ isOpen: false, id: null, title: '' });
      fetchExperiences();
    } catch (err) {
      setError('Failed to delete: ' + err.message);
      setDeleteModal({ isOpen: false, id: null, title: '' });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModal({ isOpen: false, id: null, title: '' });
  };

  if (loading) return <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>Loading experiences...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1>Manage Experience</h1>
        <Link to="/admin/experience/new" className="btn btn-primary">Add New Experience</Link>
      </div>

      {error && <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {successMsg && <div style={{ color: '#166534', backgroundColor: '#dcfce7', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{successMsg}</div>}

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Order</th>
              <th style={{ padding: '12px' }}>Role & Company</th>
              <th style={{ padding: '12px' }}>Type</th>
              <th style={{ padding: '12px' }}>Duration</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>{exp.order}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 'bold' }}>{exp.role}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{exp.company}</div>
                </td>
                <td style={{ padding: '12px' }}>{exp.type || '-'}</td>
                <td style={{ padding: '12px', fontSize: '0.85rem' }}>
                  {exp.startDate ? new Date(exp.startDate).getFullYear() : '?'} - {exp.isCurrent ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : '?')}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '0.75rem',
                    backgroundColor: exp.status === 'PUBLISHED' ? '#dcfce7' : '#fef9c3',
                    color: exp.status === 'PUBLISHED' ? '#166534' : '#854d0e'
                  }}>
                    {exp.status}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <Link to={`/admin/experience/${exp.id}/edit`} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Edit</Link>
                    <button 
                      onClick={() => handleDeleteClick(exp.id, exp.role, exp.company)} 
                      className="btn btn-secondary" 
                      style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#dc2626' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {experiences.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: 'var(--space-8)', textAlign: 'center', opacity: 0.5 }}>No experience records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="Delete Experience"
        message={`Are you sure you want to delete "${deleteModal.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminExperiences;

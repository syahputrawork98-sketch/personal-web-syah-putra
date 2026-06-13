import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminExperiences, deleteExperience } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import ConfirmModal from '../../components/admin/ConfirmModal';

const KIND_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'FORMAL_WORK', label: 'Formal Work' },
  { key: 'IT_FREELANCE', label: 'IT Freelance' },
  { key: 'GENERAL_FREELANCE', label: 'General Freelance' },
];

const KIND_COLORS = {
  FORMAL_WORK: { bg: '#dcfce7', color: '#166534', border: '#22c55e' },
  IT_FREELANCE: { bg: '#ede9fe', color: '#4c1d95', border: '#6366f1' },
  GENERAL_FREELANCE: { bg: '#fef3c7', color: '#92400e', border: '#f59e0b' },
};

const KIND_LABELS = {
  FORMAL_WORK: 'Formal Work',
  IT_FREELANCE: 'IT Freelance',
  GENERAL_FREELANCE: 'General Freelance',
};

const AdminExperiences = () => {
  const [allExperiences, setAllExperiences] = useState([]);
  const [activeTab, setActiveTab] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const fetchExperiences = async () => {
    try {
      const data = await getAdminExperiences();
      setAllExperiences(data.experiences);
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

  // Client-side filtering by experienceKind
  const filteredExperiences = activeTab === 'ALL'
    ? allExperiences
    : allExperiences.filter(exp => (exp.experienceKind || 'FORMAL_WORK') === activeTab);

  // Count per tab
  const getCount = (key) => {
    if (key === 'ALL') return allExperiences.length;
    return allExperiences.filter(exp => (exp.experienceKind || 'FORMAL_WORK') === key).length;
  };

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
        <h1>Manage Experience</h1>
        <Link to="/admin/experience/new" className="btn btn-primary">Add New Experience</Link>
      </div>

      {error && <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {successMsg && <div style={{ color: '#166534', backgroundColor: '#dcfce7', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{successMsg}</div>}

      {/* Tab Filter */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)', flexWrap: 'wrap' }}>
        {KIND_TABS.map(tab => {
          const count = getCount(tab.key);
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: isActive ? '2px solid var(--accent-color)' : '1px solid var(--border-color)',
                backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                color: isActive ? '#fff' : 'var(--text-color)',
                cursor: 'pointer',
                fontWeight: isActive ? '600' : '400',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '20px',
                height: '20px',
                padding: '0 6px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: '700',
                backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'var(--border-color)',
                color: isActive ? '#fff' : 'var(--text-muted)',
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="card" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Order</th>
              <th style={{ padding: '12px' }}>Role & Company</th>
              <th style={{ padding: '12px' }}>Kind</th>
              <th style={{ padding: '12px' }}>Type</th>
              <th style={{ padding: '12px' }}>Duration</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExperiences.map((exp) => {
              const kind = exp.experienceKind || 'FORMAL_WORK';
              const kindStyle = KIND_COLORS[kind] || KIND_COLORS.FORMAL_WORK;
              return (
                <tr key={exp.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>{exp.order}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{exp.role}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{exp.company}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '12px',
                      fontSize: '0.72rem',
                      fontWeight: '600',
                      backgroundColor: kindStyle.bg,
                      color: kindStyle.color,
                      borderLeft: `3px solid ${kindStyle.border}`,
                      whiteSpace: 'nowrap',
                    }}>
                      {KIND_LABELS[kind] || kind}
                    </span>
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
              );
            })}
            {filteredExperiences.length === 0 && (
              <tr>
                <td colSpan="7" style={{ padding: 'var(--space-8)', textAlign: 'center', opacity: 0.5 }}>
                  {activeTab === 'ALL'
                    ? 'No experience records found.'
                    : `No experiences found for "${KIND_LABELS[activeTab] || activeTab}".`}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Hapus Experience"
        message={`Yakin ingin menghapus "${deleteModal.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminExperiences;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminSkills, deleteSkill } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import ConfirmModal from '../../components/admin/ConfirmModal';

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: 'ALL', label: 'All' },
    { id: 'TECHNICAL', label: 'Technical' },
    { id: 'SOFT', label: 'Soft' },
    { id: 'LANGUAGE', label: 'Language' },
    { id: 'TOOL', label: 'Tools' },
  ];

  const fetchSkills = async (type) => {
    try {
      setLoading(true);
      const data = await getAdminSkills(type === 'ALL' ? null : type);
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
    fetchSkills(activeTab);
  }, [activeTab]);

  const handleDeleteClick = (id, title) => {
    setDeleteModal({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError('');
    setSuccessMsg('');
    try {
      await deleteSkill(deleteModal.id);
      setSuccessMsg(`Skill "${deleteModal.title}" deleted successfully.`);
      setDeleteModal({ isOpen: false, id: null, title: '' });
      fetchSkills(activeTab);
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

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1>Manage Skills</h1>
        <Link to="/admin/skills/new" className="btn btn-primary">Add New Skill</Link>
      </div>

      {/* Tabs Filter */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? 'var(--primary-color)' : 'transparent',
              color: activeTab === tab.id ? 'white' : 'var(--text-color)',
              fontWeight: activeTab === tab.id ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: activeTab === tab.id ? 1 : 0.7
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {successMsg && <div style={{ color: '#166534', backgroundColor: '#dcfce7', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{successMsg}</div>}

      <div className="card" style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', opacity: 0.6 }}>Loading {activeTab.toLowerCase()} skills...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Order</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Type</th>
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
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--bg-secondary)', opacity: 0.8 }}>
                      {skill.type}
                    </span>
                  </td>
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
                        onClick={() => handleDeleteClick(skill.id, skill.name)} 
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
                  <td colSpan="7" style={{ padding: 'var(--space-12)', textAlign: 'center', opacity: 0.5 }}>
                    No {activeTab === 'ALL' ? '' : activeTab.toLowerCase()} skills found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="Hapus Skill"
        message={`Yakin ingin menghapus "${deleteModal.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminSkills;

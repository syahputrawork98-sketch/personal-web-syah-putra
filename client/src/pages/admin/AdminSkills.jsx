import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminSkills, deleteSkill } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import ConfirmModal from '../../components/admin/ConfirmModal';

const AdminSkills = () => {
  const [allSkills, setAllSkills] = useState([]);
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

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminSkills();
      setAllSkills(data.skills || []);
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
      fetchSkills();
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

  const filteredSkills = activeTab === 'ALL'
    ? allSkills
    : allSkills.filter(skill => skill.type === activeTab);

  const getTabCount = (tabId) => {
    if (tabId === 'ALL') return allSkills.length;
    return allSkills.filter(skill => skill.type === tabId).length;
  };

  const getCategorySummary = () => {
    const counts = {};
    filteredSkills.forEach(s => {
      const cat = s.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1]) // Sort count desc
      .map(([cat, count]) => `${cat} (${count})`)
      .join(', ');
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1>Manage Skills</h1>
        <Link to="/admin/skills/new" className="btn btn-primary">Add New Skill</Link>
      </div>

      {/* Tabs Filter */}
      <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-6)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-2)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
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
              opacity: activeTab === tab.id ? 1 : 0.7,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {tab.label}
            <span style={{
              marginLeft: '6px',
              fontSize: '0.75rem',
              backgroundColor: activeTab === tab.id ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-muted, rgba(0, 0, 0, 0.05))',
              color: activeTab === tab.id ? 'white' : 'var(--text-muted, #6b7280)',
              padding: '2px 6px',
              borderRadius: '10px',
              fontWeight: '600'
            }}>
              {getTabCount(tab.id)}
            </span>
          </button>
        ))}
      </div>

      {/* Categories Summary Widget */}
      {allSkills.length > 0 && (
        <div style={{ 
          fontSize: '0.85rem', 
          backgroundColor: 'var(--bg-secondary, rgba(0, 0, 0, 0.02))', 
          padding: '10px 16px', 
          borderRadius: '6px', 
          marginBottom: 'var(--space-6)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <strong style={{ color: 'var(--text-color)' }}>Active Categories:</strong> 
          <span style={{ color: 'var(--text-muted, #6b7280)' }}>{getCategorySummary() || 'None'}</span>
        </div>
      )}

      {error && <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {successMsg && <div style={{ color: '#166534', backgroundColor: '#dcfce7', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{successMsg}</div>}

      <div className="card" style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', opacity: 0.6 }}>Loading skills...</div>
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
              {filteredSkills.map((skill) => (
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
              {filteredSkills.length === 0 && (
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

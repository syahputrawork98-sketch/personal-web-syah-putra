import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminCertifications, deleteCertification } from '../../lib/api';
import { removeToken } from '../../lib/auth';

const AdminCertifications = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const navigate = useNavigate();

  const tabs = [
    { id: 'ALL', label: 'All' },
    { id: 'FEATURED', label: 'Featured' },
    { id: 'CERTIFICATE', label: 'Sertifikat' },
    { id: 'SUPPORTING_DOCUMENT', label: 'Dokumen' },
    { id: 'BNSP', label: 'BNSP' },
    { id: 'PROFESSIONAL', label: 'Professional' },
    { id: 'TECHNICAL', label: 'Technical' },
    { id: 'ACADEMIC', label: 'Academic' },
    { id: 'TRAINING', label: 'Training' },
    { id: 'SOFT_SKILL', label: 'Soft Skill' },
    { id: 'EVENT', label: 'Event' },
    { id: 'OTHER', label: 'Other' },
  ];

  const fetchCertifications = async (tabId) => {
    try {
      setLoading(true);
      let filters = {};
      
      if (tabId === 'FEATURED') {
        filters.featured = 'true';
      } else if (tabId === 'CERTIFICATE' || tabId === 'SUPPORTING_DOCUMENT') {
        filters.type = tabId;
      } else if (tabId === 'BNSP') {
        filters.issuer = 'BNSP';
      } else if (tabId !== 'ALL') {
        filters.category = tabId;
      }

      const data = await getAdminCertifications(filters);
      setCertifications(data.certifications);
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
    fetchCertifications(activeTab);
  }, [activeTab]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteCertification(id);
        fetchCertifications(activeTab);
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
        <h1>Manage Certifications</h1>
        <Link to="/admin/certifications/new" className="btn btn-primary">Add New Certification</Link>
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
              opacity: activeTab === tab.id ? 1 : 0.7
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && <div style={{ color: 'red', marginBottom: 'var(--space-4)' }}>{error}</div>}

      <div className="card" style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', opacity: 0.6 }}>Loading {activeTab.toLowerCase()} certifications...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Order</th>
                <th style={{ padding: '12px' }}>Certification & Issuer</th>
                <th style={{ padding: '12px' }}>Type & Category</th>
                <th style={{ padding: '12px' }}>Issued Date</th>
                <th style={{ padding: '12px' }}>Flags</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((cert) => (
                <tr key={cert.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>{cert.displayPriority}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{cert.title}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{cert.issuer}</div>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.85rem' }}>{cert.type}</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{cert.category || '-'}</div>
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.85rem' }}>
                    {cert.issuedAt ? new Date(cert.issuedAt).toLocaleDateString() : '-'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    {cert.featured && (
                      <span style={{ padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', backgroundColor: '#dbeafe', color: '#1e40af', fontWeight: 'bold' }}>
                        FEATURED
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem',
                      backgroundColor: cert.status === 'PUBLISHED' ? '#dcfce7' : '#fef9c3',
                      color: cert.status === 'PUBLISHED' ? '#166534' : '#854d0e'
                    }}>
                      {cert.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <Link to={`/admin/certifications/${cert.id}/edit`} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }}>Edit</Link>
                      {(cert.certificateUrl || cert.driveUrl) && (
                        <a href={cert.certificateUrl || cert.driveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }}>View</a>
                      )}
                      <button 
                        onClick={() => handleDelete(cert.id, cert.title)} 
                        className="btn btn-secondary" 
                        style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#dc2626' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {certifications.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: 'var(--space-12)', textAlign: 'center', opacity: 0.5 }}>
                    No {activeTab === 'ALL' ? '' : activeTab.toLowerCase()} certifications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminCertifications;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAdminCertifications, deleteCertification } from '../../lib/api';
import { removeToken } from '../../lib/auth';
import ConfirmModal from '../../components/admin/ConfirmModal';

const getFilteredCertifications = (certs, tabId) => {
  if (tabId === 'ALL') return certs;
  if (tabId === 'FEATURED') return certs.filter(c => c.featured);
  if (tabId === 'CERTIFICATE') return certs.filter(c => c.type === 'CERTIFICATE');
  if (tabId === 'SUPPORTING_DOCUMENT') return certs.filter(c => c.type === 'SUPPORTING_DOCUMENT');

  return certs.filter(c => {
    const title = (c.title || '').toLowerCase();
    const issuer = (c.issuer || '').toLowerCase();
    const category = (c.category || '').toLowerCase();
    const subCategory = (c.subCategory || '').toLowerCase();
    const issuerType = (c.issuerType || '').toLowerCase();
    const skills = (c.skills || []).map(s => s.toLowerCase());

    if (tabId === 'BNSP') {
      return category === 'bnsp' || 
             issuer.includes('bnsp') || 
             issuer.includes('badan nasional sertifikasi profesi') ||
             title.includes('bnsp');
    }

    if (tabId === 'PROFESSIONAL') {
      return category === 'bnsp' ||
             title.includes('certified') ||
             title.includes('certification') ||
             title.includes('sertifikat kompetensi') ||
             issuerType.includes('professional') ||
             issuerType.includes('association') ||
             issuer.includes('profesi') ||
             c.id.includes('cbec');
    }

    if (tabId === 'TECHNICAL') {
      return category === 'it & digital' ||
             category === 'teknik & manufaktur' ||
             category === 'konstruksi' ||
             subCategory.includes('development') ||
             subCategory.includes('cad') ||
             subCategory.includes('drafting') ||
             subCategory.includes('engineering') ||
             subCategory.includes('programming') ||
             skills.some(s => ['react', 'node', 'javascript', 'cad', '3d', 'engineering', 'cloud', 'azure', 'programming', 'software'].some(k => s.includes(k)));
    }

    if (tabId === 'ACADEMIC') {
      return issuerType.includes('school') ||
             issuerType.includes('university') ||
             issuerType.includes('college') ||
             issuerType.includes('academic') ||
             issuer.includes('smk') ||
             issuer.includes('institut') ||
             issuer.includes('universitas') ||
             subCategory.includes('academic') ||
             title.includes('sekolah') ||
             title.includes('kuliah');
    }

    if (tabId === 'TRAINING') {
      return category === 'it & digital' ||
             title.includes('pelatihan') ||
             title.includes('training') ||
             title.includes('course') ||
             title.includes('bootcamp') ||
             title.includes('lulus') ||
             issuerType.includes('training') ||
             issuerType.includes('vocational') ||
             issuerType.includes('education') ||
             issuer.includes('lpk') ||
             issuer.includes('lkp') ||
             issuer.includes('balai besar');
    }

    if (tabId === 'SOFT_SKILL') {
      return category === 'pengembangan diri' ||
             subCategory.includes('growth') ||
             subCategory.includes('development') ||
             subCategory.includes('leadership') ||
             subCategory.includes('communication') ||
             subCategory.includes('language') ||
             skills.some(s => ['leadership', 'communication', 'teamwork', 'discipline', 'resilience', 'growth', 'personal', 'english', 'japanese', 'language'].some(k => s.includes(k)));
    }

    if (tabId === 'EVENT') {
      return category === 'magang & partisipasi' ||
             title.includes('partisipasi') ||
             title.includes('kehadiran') ||
             title.includes('bootcamp') ||
             title.includes('event') ||
             subCategory.includes('participation') ||
             subCategory.includes('event') ||
             skills.some(s => s.includes('participation') || s.includes('attendance') || s.includes('ojt') || s.includes('internship'));
    }

    if (tabId === 'OTHER') {
      return category === 'other' || category === 'dokumen pendukung' ||
             (!['bnsp', 'it & digital', 'teknik & manufaktur', 'konstruksi', 'pengembangan diri', 'magang & partisipasi'].includes(category));
    }

    return false;
  });
};

const AdminCertifications = () => {
  const [allCertifications, setAllCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeTab, setActiveTab] = useState('ALL');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '' });
  const [isDeleting, setIsDeleting] = useState(false);
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

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getAdminCertifications();
      setAllCertifications(data.certifications || []);
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
    fetchCertifications();
  }, []);

  const handleDeleteClick = (id, title) => {
    setDeleteModal({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError('');
    setSuccessMsg('');
    try {
      await deleteCertification(deleteModal.id);
      setSuccessMsg(`Certification "${deleteModal.title}" deleted successfully.`);
      setDeleteModal({ isOpen: false, id: null, title: '' });
      fetchCertifications();
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

  const filteredCertifications = getFilteredCertifications(allCertifications, activeTab);

  const getTabCount = (tabId) => {
    return getFilteredCertifications(allCertifications, tabId).length;
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

      {error && <div style={{ color: '#dc2626', backgroundColor: '#fee2e2', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{error}</div>}
      {successMsg && <div style={{ color: '#166534', backgroundColor: '#dcfce7', padding: 'var(--space-4)', borderRadius: '4px', marginBottom: 'var(--space-4)' }}>{successMsg}</div>}

      <div className="card" style={{ overflowX: 'auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-12)', opacity: 0.6 }}>Loading certifications...</div>
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
              {filteredCertifications.map((cert) => (
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
                    {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString() : '-'}
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
                      {cert.driveUrl ? (
                        <a href={cert.driveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }}>View Drive</a>
                      ) : cert.certificateUrl ? (
                        <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.8rem' }}>View File</a>
                      ) : null}
                      <button 
                        onClick={() => handleDeleteClick(cert.id, cert.title)} 
                        className="btn btn-secondary" 
                        style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#dc2626' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCertifications.length === 0 && (
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

      <ConfirmModal 
        isOpen={deleteModal.isOpen}
        title="Hapus Credential"
        message={`Yakin ingin menghapus "${deleteModal.title}"? Tindakan ini tidak bisa dibatalkan.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default AdminCertifications;

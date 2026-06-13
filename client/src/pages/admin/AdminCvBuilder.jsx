import React, { useState, useEffect } from 'react';
import { 
  getAdminProjects, 
  getAdminSkills, 
  getAdminExperiences, 
  getAdminEducation, 
  getAdminCertifications,
  getAdminProfile,
  getAdminContact,
  getCvBuilderConfig,
  updateCvBuilderConfig
} from '../../lib/api';
import '../../styles/cv-print.css';

// Utilities
import { normalizeCvConfig } from '../../utils/cvBuilder/cvConfigNormalizer';
import { getActiveVariant } from '../../utils/cvBuilder/cvVariantUtils';
import { getDataForSection } from '../../utils/cvBuilder/cvSectionUtils';

// Components
import CvVariantSelector from '../../components/admin/cv-builder/CvVariantSelector';
import CvBuilderStatus from '../../components/admin/cv-builder/CvBuilderStatus';
import CvIdentityForm from '../../components/admin/cv-builder/CvIdentityForm';
import CvSummaryForm from '../../components/admin/cv-builder/CvSummaryForm';
import CvSectionManager from '../../components/admin/cv-builder/CvSectionManager';
import CvPreview from '../../components/admin/cv-builder/CvPreview';

const AdminCvBuilder = () => {
  const [data, setData] = useState({
    profile: null,
    contact: null,
    projects: [],
    skills: [],
    experience: [],
    education: [],
    certifications: []
  });
  
  const [cvConfig, setCvConfig] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');
  
  const [searchQueries, setSearchQueries] = useState({});
  const [activeTab, setActiveTab] = useState('identity');
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const updateCvConfig = (nextConfig) => {
    setCvConfig(nextConfig);
    setIsDirty(true);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [
          projectsRes, 
          skillsRes, 
          expRes, 
          eduRes, 
          certRes,
          profileRes,
          contactRes,
          configRes
        ] = await Promise.all([
          getAdminProjects(),
          getAdminSkills(),
          getAdminExperiences(),
          getAdminEducation(),
          getAdminCertifications(),
          getAdminProfile(),
          getAdminContact(),
          getCvBuilderConfig()
        ]);

        setData({
          profile: profileRes.profile || {},
          contact: contactRes.contact || {},
          projects: projectsRes.projects || [],
          skills: skillsRes.skills || [],
          experience: expRes.experiences || [],
          education: eduRes.education || [],
          certifications: certRes.certifications || []
        });

        if (configRes) {
          const normalizedConfig = normalizeCvConfig(configRes, profileRes, contactRes);
          setCvConfig(normalizedConfig);
          setIsDirty(false);
        }

      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleSaveConfig = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccessMsg('');
      await updateCvBuilderConfig(cvConfig);
      setSuccessMsg('CV Configuration saved successfully!');
      setIsDirty(false);
      setLastSaved(new Date());
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save config');
    } finally {
      setSaving(false);
    }
  };

  const activeVariant = getActiveVariant(cvConfig);

  const updateActiveVariant = (patch) => {
    const nextConfig = { ...cvConfig };
    const variantIndex = nextConfig.variants.findIndex(v => v.id === nextConfig.activeVariantId);
    if (variantIndex !== -1) {
      nextConfig.variants[variantIndex] = {
        ...nextConfig.variants[variantIndex],
        ...patch
      };
      updateCvConfig(nextConfig);
    }
  };

  const handleSwitchVariant = (variantId) => {
    updateCvConfig({
      ...cvConfig,
      activeVariantId: variantId
    });
  };

  const moveSection = (index, direction) => {
    if (!activeVariant) return;
    const newSections = activeVariant.sections.map(s => ({ ...s }));
    if (direction === 'up' && index > 0) {
      const tempOrder = newSections[index].order;
      newSections[index].order = newSections[index - 1].order;
      newSections[index - 1].order = tempOrder;
      
      const temp = newSections[index];
      newSections[index] = newSections[index - 1];
      newSections[index - 1] = temp;
    } else if (direction === 'down' && index < newSections.length - 1) {
      const tempOrder = newSections[index].order;
      newSections[index].order = newSections[index + 1].order;
      newSections[index + 1].order = tempOrder;
      
      const temp = newSections[index];
      newSections[index] = newSections[index + 1];
      newSections[index + 1] = temp;
    }
    updateActiveVariant({ sections: newSections });
  };

  const toggleSection = (index) => {
    if (!activeVariant) return;
    const newSections = activeVariant.sections.map((s, idx) => {
      if (idx === index) {
        if (s.id === 'experience' || s.id === 'education') return s;
        return { ...s, enabled: !s.enabled };
      }
      return s;
    });
    updateActiveVariant({ sections: newSections });
  };

  const toggleItemSelection = (sectionIndex, itemId) => {
    if (!activeVariant) return;
    const newSections = activeVariant.sections.map((s, idx) => {
      if (idx === sectionIndex) {
        const selectedIds = s.selectedIds ? [...s.selectedIds] : [];
        const nextSelectedIds = selectedIds.includes(itemId)
          ? selectedIds.filter(id => id !== itemId)
          : [...selectedIds, itemId];
        return { ...s, selectedIds: nextSelectedIds };
      }
      return s;
    });
    updateActiveVariant({ sections: newSections });
  };

  const handleSelectAll = (sectionIndex) => {
    if (!activeVariant) return;
    const newSections = activeVariant.sections.map((s, idx) => {
      if (idx === sectionIndex) {
        const sectionData = getDataForSection(s.id, data);
        return { ...s, selectedIds: sectionData.map(item => item.id) };
      }
      return s;
    });
    updateActiveVariant({ sections: newSections });
  };

  const handleClearSelection = (sectionIndex) => {
    if (!activeVariant) return;
    const newSections = activeVariant.sections.map((s, idx) => {
      if (idx === sectionIndex) {
        return { ...s, selectedIds: [] };
      }
      return s;
    });
    updateActiveVariant({ sections: newSections });
  };

  const getItemLabel = (sectionId, item) => {
    if (!item) return 'Item';
    if (sectionId === 'experience') return item.role;
    if (sectionId === 'projects') return item.title;
    if (sectionId === 'education') return item.degree;
    if (sectionId === 'credentials') return item.title;
    if (sectionId === 'skills') return item.name;
    return item.name || item.title || 'Item';
  };

  const getItemMeta = (sectionId, item) => {
    if (!item) return '';
    if (sectionId === 'experience') {
      return `${item.company || ''} ${item.period ? `(${item.period})` : ''}`.trim();
    }
    if (sectionId === 'projects') {
      return item.category || '';
    }
    if (sectionId === 'education') {
      return `${item.school || ''} ${item.period ? `(${item.period})` : ''}`.trim();
    }
    if (sectionId === 'credentials') {
      const dateVal = item.issuedDate || item.issueDate;
      const year = dateVal ? new Date(dateVal).getFullYear() : '';
      return `${item.issuer || ''} ${year ? `(${year})` : ''}`.trim();
    }
    return '';
  };

  if (loading || !cvConfig) return <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>Loading CV Data...</div>;

  const sortedSections = activeVariant
    ? [...activeVariant.sections].sort((a, b) => a.order - b.order)
    : [];

  const enabledSectionsCount = activeVariant
    ? activeVariant.sections.filter(s => s.enabled && s.id !== 'profile').length
    : 0;

  const totalSelectedItems = activeVariant
    ? activeVariant.sections
        .filter(s => s.enabled && s.selectedIds)
        .reduce((sum, s) => sum + s.selectedIds.length, 0)
    : 0;

  const setSearchQuery = (sectionId, query) => {
    setSearchQueries(prev => ({ ...prev, [sectionId]: query }));
  };

  return (
    <div className="cv-builder-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--space-2) 0' }}>CV Builder</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>Atur dan sesuaikan isi CV Anda agar ATS-friendly sebelum dicetak.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          {isDirty && (
            <span style={{ color: '#b45309', fontSize: '0.85rem', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              ⚠️ Unsaved Changes
            </span>
          )}
          <button 
            onClick={() => {
              if (isDirty) {
                if (window.confirm('Ada perubahan yang belum disimpan. Tetap cetak?')) {
                  window.print();
                }
              } else {
                window.print();
              }
            }} 
            className="btn btn-secondary"
          >
            Print / Save as PDF
          </button>
          <button 
            onClick={handleSaveConfig} 
            disabled={saving}
            className="btn btn-primary"
          >
            {saving ? 'Saving...' : 'Save Config'}
          </button>
        </div>
      </div>

      {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: 'var(--space-4)', borderRadius: '4px' }}>{error}</div>}
      {successMsg && <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: 'var(--space-4)', borderRadius: '4px' }}>{successMsg}</div>}

      <div className="cv-builder-grid">
        
        {/* Left Panel: Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minWidth: 0 }}>
          
          <CvVariantSelector
            cvConfig={cvConfig}
            activeVariant={activeVariant}
            handleSwitchVariant={handleSwitchVariant}
            updateCvConfig={updateCvConfig}
          />

          <CvBuilderStatus
            isDirty={isDirty}
            lastSaved={lastSaved}
            enabledSectionsCount={enabledSectionsCount}
            totalSelectedItems={totalSelectedItems}
          />

          {/* Helper Tips Banner */}
          <div style={{ padding: '10px 14px', backgroundColor: 'var(--bg-color)', borderLeft: '4px solid var(--primary-color)', fontSize: '0.85rem', borderRadius: '4px', lineHeight: '1.4' }}>
            <strong>💡 ATS Tip:</strong> CV ideal berukuran <strong>1–2 halaman A4</strong>. Batasi jumlah item agar tidak melebihi area halaman pratinjau di kanan.
          </div>

          {/* Workflow Tabs */}
          <div className="cv-builder-tabs">
            <button 
              onClick={() => setActiveTab('identity')}
              className={`cv-builder-tab-btn ${activeTab === 'identity' ? 'active' : ''}`}
            >
              Identity
            </button>
            <button 
              onClick={() => setActiveTab('summary')}
              className={`cv-builder-tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            >
              Summary
            </button>
            <button 
              onClick={() => setActiveTab('sections')}
              className={`cv-builder-tab-btn ${activeTab === 'sections' ? 'active' : ''}`}
            >
              Sections & Items
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`cv-builder-tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
            >
              Preview & Export
            </button>
          </div>

          {/* Tab Contents */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            
            {activeTab === 'identity' && (
              <CvIdentityForm
                activeVariant={activeVariant}
                updateActiveVariant={updateActiveVariant}
                profileName={data.profile?.name}
                profileTitle={data.profile?.title}
              />
            )}

            {activeTab === 'summary' && (
              <CvSummaryForm
                activeVariant={activeVariant}
                updateActiveVariant={updateActiveVariant}
              />
            )}

            {activeTab === 'sections' && (
              <CvSectionManager
                activeVariant={activeVariant}
                sortedSections={sortedSections}
                getDataForSection={(id) => getDataForSection(id, data)}
                toggleSection={toggleSection}
                moveSection={moveSection}
                searchQueries={searchQueries}
                setSearchQuery={setSearchQuery}
                toggleItemSelection={toggleItemSelection}
                handleSelectAll={handleSelectAll}
                handleClearSelection={handleClearSelection}
                getItemLabel={getItemLabel}
                getItemMeta={getItemMeta}
              />
            )}

            {activeTab === 'preview' && (
              <div className="card" style={{ padding: 'var(--space-4)' }}>
                <h3 style={{ margin: '0 0 var(--space-4) 0', fontSize: '1.1rem' }}>Preview & Export Instructions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  
                  <div style={{ padding: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', color: '#166534', fontSize: '0.85rem' }}>
                    <strong>👉 Cara Cetak PDF Terbaik:</strong>
                    <ol style={{ margin: '8px 0 0 0', paddingLeft: '20px', lineHeight: '1.5' }}>
                      <li>Klik tombol <strong>Print / Save as PDF</strong> di bawah ini atau di pojok kanan atas.</li>
                      <li>Di dialog cetak browser, ubah Destination menjadi <strong>Save as PDF</strong>.</li>
                      <li>Set Layout menjadi <strong>Portrait</strong>.</li>
                      <li>Di bagian More Settings, set Paper Size ke <strong>A4</strong>.</li>
                      <li>Set Margins ke <strong>None</strong> (Sangat Penting agar layout pas).</li>
                      <li>Centang <strong>Background graphics</strong>.</li>
                    </ol>
                  </div>

                  <div style={{ padding: '12px', backgroundColor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '6px', color: '#92400e', fontSize: '0.85rem' }}>
                    <strong>⚠️ Visual Page Overflow Guard:</strong>
                    <p style={{ margin: '8px 0 0 0', lineHeight: '1.5' }}>
                      CV didesain presisi untuk ideal <strong>1-2 halaman A4</strong>. 
                      Jika Anda memilih terlalu banyak item, konten mungkin akan melebihi batas bawah halaman pratinjau A4 di sebelah kanan dan akan terpotong pada cetakan fisik/PDF. Silakan kurangi item yang dipilih jika terjadi overflow visual.
                      <br /><br />
                      <em>Long content may overflow the A4 preview. Reduce selected items or print carefully.</em>
                    </p>
                  </div>

                  {isDirty && (
                    <div style={{ padding: '12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#991b1b', fontSize: '0.85rem' }}>
                      <strong>⚠️ Unsaved Changes:</strong> Anda memiliki perubahan konfigurasi yang belum disimpan. Tombol cetak di bawah ini akan menggunakan konfigurasi terakhir yang <strong>belum disimpan</strong> di database (hanya tampil di pratinjau saat ini). Sangat disarankan untuk klik <strong>Save Config</strong> sebelum mencetak.
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <button 
                      onClick={() => {
                        if (isDirty) {
                          if (window.confirm('Anda memiliki konfigurasi yang belum disimpan. Tetap cetak?')) {
                            window.print();
                          }
                        } else {
                          window.print();
                        }
                      }}
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '10px' }}
                    >
                      Print / Save as PDF
                    </button>
                    <button 
                      onClick={handleSaveConfig} 
                      disabled={saving}
                      className="btn btn-primary"
                      style={{ flex: 1, padding: '10px' }}
                    >
                      {saving ? 'Saving...' : 'Save Config'}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Panel: ATS Preview */}
        <CvPreview
          activeVariant={activeVariant}
          data={data}
          totalSelectedItems={totalSelectedItems}
        />

      </div>
    </div>
  );
};

export default AdminCvBuilder;

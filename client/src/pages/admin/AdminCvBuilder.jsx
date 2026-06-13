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

const normalizeCvConfig = (configRes, profileRes, contactRes) => {
  const defaultVariantIds = ['web-developer', 'construction', 'manufacturing', 'general-ats'];
  const defaultLabels = {
    'web-developer': 'Web Developer',
    'construction': 'Konstruksi',
    'manufacturing': 'Manufaktur',
    'general-ats': 'ATS Umum'
  };

  const baseSections = (configRes?.sections && configRes.sections.length > 0)
    ? configRes.sections
    : [
        { id: 'skills', enabled: true, order: 1, selectedIds: [] },
        { id: 'experience', enabled: true, order: 2, selectedIds: [] },
        { id: 'projects', enabled: true, order: 3, selectedIds: [] },
        { id: 'education', enabled: true, order: 4, selectedIds: [] },
        { id: 'credentials', enabled: true, order: 5, selectedIds: [] }
      ];

  const ensuredBaseSections = baseSections.map(s => {
    if (s.id === 'experience' || s.id === 'education') {
      return { ...s, enabled: true };
    }
    return s;
  });

  const defaultContact = {
    displayName: configRes?.displayName || profileRes?.profile?.name || '',
    phone: configRes?.phone || '0851 6265 4466',
    website: configRes?.website || 'https://syahputran.vercel.app/',
    github: configRes?.github || 'https://bit.ly/4xrqAWN',
    email: configRes?.email || contactRes?.contact?.email || '',
    location: configRes?.location || contactRes?.contact?.location || ''
  };

  let activeVariantId = configRes?.activeVariantId || 'web-developer';
  let variants = [];

  if (configRes && configRes.variants && Array.isArray(configRes.variants) && configRes.variants.length > 0) {
    variants = [...configRes.variants];
  } else {
    // Migrate existing root config into the web-developer variant
    const mainVariant = {
      id: 'web-developer',
      name: 'Web Developer',
      displayName: configRes?.displayName || defaultContact.displayName,
      professionalTitle: configRes?.professionalTitle || profileRes?.profile?.title || 'Full Stack Developer',
      targetRole: configRes?.targetRole || 'Full Stack Developer',
      summary: configRes?.summary || '',
      phone: configRes?.phone || defaultContact.phone,
      website: configRes?.website || defaultContact.website,
      github: configRes?.github || defaultContact.github,
      email: configRes?.email || defaultContact.email,
      location: configRes?.location || defaultContact.location,
      sections: ensuredBaseSections
    };
    
    variants.push(mainVariant);
  }

  // Ensure all 4 default variants are present
  defaultVariantIds.forEach(id => {
    const exists = variants.some(v => v.id === id);
    if (!exists) {
      let defaultTitle = '';
      if (id === 'construction') defaultTitle = 'Construction Staff';
      if (id === 'manufacturing') defaultTitle = 'Manufacturing Operator';
      if (id === 'general-ats') defaultTitle = 'Professional';
      if (id === 'web-developer') defaultTitle = 'Web Developer';

      variants.push({
        id,
        name: defaultLabels[id],
        displayName: defaultContact.displayName,
        professionalTitle: defaultTitle,
        targetRole: defaultTitle,
        summary: '',
        phone: defaultContact.phone,
        website: defaultContact.website,
        github: defaultContact.github,
        email: defaultContact.email,
        location: defaultContact.location,
        sections: ensuredBaseSections.map(s => ({ ...s, selectedIds: [] }))
      });
    }
  });

  if (!defaultVariantIds.includes(activeVariantId)) {
    activeVariantId = 'web-developer';
  }

  return {
    ...configRes,
    activeVariantId,
    variants
  };
};

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

  const activeVariant = cvConfig ? (cvConfig.variants.find(v => v.id === cvConfig.activeVariantId) || cvConfig.variants[0]) : null;

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

  const getDataForSection = (id) => {
    if (id === 'experience') return data.experience;
    if (id === 'education') return data.education;
    if (id === 'skills') return data.skills;
    if (id === 'projects') return data.projects;
    if (id === 'credentials') return data.certifications;
    return [];
  };

  const getSectionConfig = (sectionId) => {
    if (!activeVariant) return null;
    return activeVariant.sections.find(s => s.id === sectionId);
  };

  const handleSelectAll = (sectionIndex) => {
    if (!activeVariant) return;
    const newSections = activeVariant.sections.map((s, idx) => {
      if (idx === sectionIndex) {
        const sectionData = getDataForSection(s.id);
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
    if (sectionId === 'experience') return item.role;
    if (sectionId === 'projects') return item.title;
    if (sectionId === 'education') return item.degree;
    if (sectionId === 'credentials') return item.title;
    if (sectionId === 'skills') return item.name;
    return item.name || item.title || 'Item';
  };

  const getItemMeta = (sectionId, item) => {
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
      const year = (item.issuedDate || item.issueDate) ? new Date(item.issuedDate || item.issueDate).getFullYear() : '';
      return `${item.issuer || ''} ${year ? `(${year})` : ''}`.trim();
    }
    return '';
  };

  const getDisplayItems = (sectionId) => {
    const section = getSectionConfig(sectionId);
    if (!section || !section.enabled) return [];
    
    const rawItems = getDataForSection(sectionId);
    const selectedIds = section.selectedIds || [];
    
    if (selectedIds.length > 0) {
      // Map based on selectedIds to maintain the specific ordering defined by the user
      return selectedIds
        .map(id => rawItems.find(item => item.id === id))
        .filter(Boolean);
    }
    
    return []; // Return empty array if selectedIds is empty (Manual Curated Mode)
  };

  const renderSkillsSection = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="cv-print-section" style={{ marginBottom: '4mm' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', margin: '0 0 2mm 0', paddingBottom: '0.5mm', letterSpacing: '0.5px' }}>
          Skills
        </h2>
        <div style={{ fontSize: '9pt', color: '#111', lineHeight: 1.4 }}>
          {items.map(s => s.name).join('  •  ')}
        </div>
      </div>
    );
  };

  const renderExperienceSection = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="cv-print-section" style={{ marginBottom: '4mm' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', margin: '0 0 2mm 0', paddingBottom: '0.5mm', letterSpacing: '0.5px' }}>
          Work Experience
        </h2>
        {items.map(exp => (
          <div key={exp.id} className="cv-print-item" style={{ marginBottom: '3mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontWeight: 'bold', fontSize: '10pt' }}>
              <span>{exp.role}</span>
              {exp.period && <span style={{ fontWeight: 'normal', fontSize: '9pt', color: '#222', whiteSpace: 'nowrap', marginLeft: '8px' }}>{exp.period}</span>}
            </div>
            <div style={{ fontSize: '9pt', fontStyle: 'italic', marginBottom: '0.5mm', color: '#333' }}>{exp.company}</div>
            {exp.description && <p style={{ fontSize: '9pt', margin: '0', whiteSpace: 'pre-line', color: '#111' }}>{exp.description}</p>}
          </div>
        ))}
      </div>
    );
  };

  const renderProjectsSection = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="cv-print-section" style={{ marginBottom: '4mm' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', margin: '0 0 2mm 0', paddingBottom: '0.5mm', letterSpacing: '0.5px' }}>
          Featured Projects
        </h2>
        {items.map(proj => (
          <div key={proj.id} className="cv-print-item" style={{ marginBottom: '2.5mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontWeight: 'bold', fontSize: '10pt' }}>
              <span>{proj.title}</span>
              <span style={{ fontWeight: 'normal', fontSize: '9pt', color: '#222' }}>{proj.category}</span>
            </div>
            {proj.description && <p style={{ fontSize: '9pt', margin: '1px 0 0 0', whiteSpace: 'pre-line', color: '#111' }}>{proj.description}</p>}
          </div>
        ))}
      </div>
    );
  };

  const renderEducationSection = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="cv-print-section" style={{ marginBottom: '4mm' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', margin: '0 0 2mm 0', paddingBottom: '0.5mm', letterSpacing: '0.5px' }}>
          Education
        </h2>
        {items.map(edu => (
          <div key={edu.id} className="cv-print-item" style={{ marginBottom: '2.5mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontWeight: 'bold', fontSize: '10pt' }}>
              <span>{edu.school}</span>
              {edu.period && <span style={{ fontWeight: 'normal', fontSize: '9pt', color: '#222', whiteSpace: 'nowrap', marginLeft: '8px' }}>{edu.period}</span>}
            </div>
            <div style={{ fontSize: '9pt', fontStyle: 'italic', marginBottom: '0.5mm', color: '#333' }}>{edu.degree}</div>
            {edu.description && <p style={{ fontSize: '9pt', margin: '0', whiteSpace: 'pre-line', color: '#111' }}>{edu.description}</p>}
          </div>
        ))}
      </div>
    );
  };

  const renderCredentialsSection = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="cv-print-section" style={{ marginBottom: '3mm' }}>
        <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', margin: '0 0 2mm 0', paddingBottom: '0.5mm', letterSpacing: '0.5px' }}>
          Credentials & Certifications
        </h2>
        {items.map(cert => (
          <div key={cert.id} className="cv-print-item" style={{ marginBottom: '1.5mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '10pt' }}>
              <span>{cert.title}</span>
              <span style={{ fontWeight: 'normal', fontSize: '9pt', color: '#222' }}>{(cert.issuedDate || cert.issueDate) ? new Date(cert.issuedDate || cert.issueDate).getFullYear() : ''}</span>
            </div>
            <div style={{ fontSize: '9pt', color: '#333' }}>{cert.issuer}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderSectionById = (sectionId) => {
    const displayItems = getDisplayItems(sectionId);
    if (sectionId === 'skills') return renderSkillsSection(displayItems);
    if (sectionId === 'experience') return renderExperienceSection(displayItems);
    if (sectionId === 'projects') return renderProjectsSection(displayItems);
    if (sectionId === 'education') return renderEducationSection(displayItems);
    if (sectionId === 'credentials') return renderCredentialsSection(displayItems);
    return null;
  };

  const formatSectionTitle = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  const previewEmail = activeVariant?.email || data.contact?.email || '';
  const previewPhone = activeVariant?.phone || data.contact?.phone || '';
  const previewLocation = activeVariant?.location || data.contact?.location || '';
  const previewWebsite = activeVariant?.website || data.contact?.website || '';
  const previewLinkedin = data.contact?.linkedin || '';
  const previewGithub = activeVariant?.github || data.contact?.github || '';

  const contactLinks = [
    previewEmail,
    previewPhone,
    previewLocation,
    previewWebsite,
    previewLinkedin,
    previewGithub
  ].filter(Boolean);

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
          
          {/* CV Variant Selector Widget */}
          <div className="card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Active CV Variant
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '600' }}>
                {activeVariant ? activeVariant.name : ''}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={cvConfig.activeVariantId}
                onChange={(e) => handleSwitchVariant(e.target.value)}
                className="form-input"
                style={{ flex: 1, padding: '6px var(--space-3)', fontSize: '0.9rem', cursor: 'pointer' }}
              >
                {cvConfig.variants.map(v => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
            <span style={{ fontSize: '0.75rem', opacity: 0.6, lineHeight: '1.3' }}>
              Each variant keeps its own identity, summary, contact overrides, and selected database items.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px', paddingTop: '8px', borderTop: '1px dashed var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Copy current to:</span>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {cvConfig.variants.filter(v => v.id !== cvConfig.activeVariantId).map(target => (
                  <button
                    key={target.id}
                    onClick={() => {
                      if (window.confirm(`Copy all settings of "${activeVariant.name}" to "${target.name}"? This will overwrite the target variant.`)) {
                        const newVariants = cvConfig.variants.map(v => {
                          if (v.id === target.id) {
                            return {
                              ...activeVariant,
                              id: target.id,
                              name: target.name
                            };
                          }
                          return v;
                        });
                        updateCvConfig({
                          ...cvConfig,
                          variants: newVariants
                        });
                      }
                    }}
                    className="btn btn-secondary"
                    style={{ padding: '2px 6px', fontSize: '0.7rem', minWidth: 'auto' }}
                  >
                    {target.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Status Widget */}
          <div className="card" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Status:</span>
                {isDirty ? (
                  <span className="cv-builder-status-badge dirty">
                    🔴 Unsaved
                  </span>
                ) : (
                  <span className="cv-builder-status-badge clean">
                    🟢 Saved
                  </span>
                )}
              </div>
              {lastSaved && (
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div className="cv-builder-stat-card">
                <div className="cv-builder-stat-num">{enabledSectionsCount}</div>
                <div className="cv-builder-stat-label">Active Sections</div>
              </div>
              <div style={{ width: '1px', backgroundColor: 'var(--border-color)', height: '28px', alignSelf: 'center' }}></div>
              <div className="cv-builder-stat-card">
                <div className="cv-builder-stat-num">{totalSelectedItems}</div>
                <div className="cv-builder-stat-label">Selected Items</div>
              </div>
            </div>
          </div>

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
              <div className="card" style={{ padding: 'var(--space-4)' }}>
                <h3 style={{ margin: '0 0 var(--space-4) 0', fontSize: '1.1rem' }}>CV Identity Information</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>CV Display Name</label>
                    <input 
                      type="text" 
                      value={activeVariant?.displayName || ''} 
                      onChange={(e) => updateActiveVariant({ displayName: e.target.value })} 
                      placeholder={data.profile?.name || 'Your Name'} 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Professional Title</label>
                    <input 
                      type="text" 
                      value={activeVariant?.professionalTitle || ''} 
                      onChange={(e) => updateActiveVariant({ professionalTitle: e.target.value })} 
                      placeholder={data.profile?.title || 'e.g. Full Stack Developer'} 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Target Role (Optional)</label>
                    <input 
                      type="text" 
                      value={activeVariant?.targetRole || ''} 
                      onChange={(e) => updateActiveVariant({ targetRole: e.target.value })} 
                      placeholder="e.g. Senior Frontend Engineer" 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Phone Number Override</label>
                    <input 
                      type="text" 
                      value={activeVariant?.phone || ''} 
                      onChange={(e) => updateActiveVariant({ phone: e.target.value })} 
                      placeholder="e.g. 0851 6265 4466" 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Website URL Override</label>
                    <input 
                      type="text" 
                      value={activeVariant?.website || ''} 
                      onChange={(e) => updateActiveVariant({ website: e.target.value })} 
                      placeholder="e.g. https://syahputran.vercel.app/" 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>GitHub Link Override</label>
                    <input 
                      type="text" 
                      value={activeVariant?.github || ''} 
                      onChange={(e) => updateActiveVariant({ github: e.target.value })} 
                      placeholder="e.g. https://bit.ly/4xrqAWN" 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Email Override</label>
                    <input 
                      type="text" 
                      value={activeVariant?.email || ''} 
                      onChange={(e) => updateActiveVariant({ email: e.target.value })} 
                      placeholder="e.g. email@example.com" 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Location Override</label>
                    <input 
                      type="text" 
                      value={activeVariant?.location || ''} 
                      onChange={(e) => updateActiveVariant({ location: e.target.value })} 
                      placeholder="e.g. Jakarta, Indonesia" 
                      className="form-input" 
                      style={{ width: '100%', boxSizing: 'border-box' }} 
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'summary' && (
              <div className="card" style={{ padding: 'var(--space-4)' }}>
                <h3 style={{ margin: '0 0 var(--space-4) 0', fontSize: '1.1rem' }}>Professional Summary</h3>
                <textarea 
                  value={activeVariant?.summary || ''}
                  onChange={(e) => updateActiveVariant({ summary: e.target.value })}
                  placeholder="Write a brief professional summary..."
                  style={{ width: '100%', minHeight: '180px', padding: 'var(--space-2)', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: '1.5' }}
                />
              </div>
            )}

            {activeTab === 'sections' && (
              <div className="card" style={{ padding: 'var(--space-4)' }}>
                <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1.1rem' }}>Database Sections & Ordering</h3>
                <p style={{ margin: '0 0 var(--space-4) 0', fontSize: '0.85rem', opacity: 0.7 }}>
                  Experience dan Education selalu aktif secara default. Pilih item yang ingin ditampilkan, atau biarkan kosong untuk menampilkan semua data.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {sortedSections.map((section, index) => {
                    const isProfile = section.id === 'profile';
                    if (isProfile) return null; // Handled by Manual Identity

                    const sectionData = getDataForSection(section.id);
                    const actualIndexInConfig = activeVariant.sections.findIndex(s => s.id === section.id);
                    const isMandatory = section.id === 'experience' || section.id === 'education';

                    const totalCount = sectionData.length;
                    const selectedCount = section.selectedIds?.length || 0;
                    const isUsingAll = selectedCount === 0;

                    return (
                      <div key={section.id} style={{ border: '1px solid var(--border-color)', borderRadius: '6px', padding: 'var(--space-3)', opacity: section.enabled ? 1 : 0.6 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                            <input 
                              type="checkbox" 
                              checked={section.enabled}
                              onChange={() => {
                                if (!isMandatory) toggleSection(actualIndexInConfig);
                              }}
                              disabled={isMandatory}
                              style={{ cursor: isMandatory ? 'not-allowed' : 'pointer', width: '16px', height: '16px' }}
                            />
                            <h4 style={{ margin: 0, textTransform: 'capitalize' }}>
                              {formatSectionTitle(section.id)} 
                              {isMandatory && <span style={{ fontSize: '0.75rem', opacity: 0.6, marginLeft: '6px', fontWeight: 'normal' }}>(Required)</span>}
                            </h4>
                          </div>
                          <div style={{ display: 'flex', gap: '4px' }}>
                            <button 
                              onClick={() => moveSection(actualIndexInConfig, 'up')}
                              disabled={index === 0 || (index === 1 && sortedSections[0].id === 'profile')}
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '0.75rem', minWidth: 'auto' }}
                            >
                              ↑
                            </button>
                            <button 
                              onClick={() => moveSection(actualIndexInConfig, 'down')}
                              disabled={index === sortedSections.length - 1}
                              className="btn btn-secondary"
                              style={{ padding: '2px 6px', fontSize: '0.75rem', minWidth: 'auto' }}
                            >
                              ↓
                            </button>
                          </div>
                        </div>

                        {/* Section stats / mode info */}
                        {section.enabled && (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0 var(--space-2) 0', fontSize: '0.8rem' }}>
                            <div style={{ opacity: 0.8 }}>
                              <span>Total data: <strong>{totalCount}</strong></span>
                              <span style={{ margin: '0 8px', opacity: 0.4 }}>|</span>
                              <span>Selected: <strong>{selectedCount}</strong></span>
                            </div>
                            <div>
                              {isUsingAll ? (
                                <span style={{ color: '#ef4444', backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '2px 8px', borderRadius: '4px', fontWeight: '500', fontSize: '0.75rem' }}>
                                  ⚠️ No items selected
                                </span>
                              ) : (
                                <span style={{ color: '#1e3a8a', backgroundColor: '#dbeafe', padding: '2px 8px', borderRadius: '4px', fontWeight: '500', fontSize: '0.75rem' }}>
                                  🎯 Using selected items
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Unified Selector Area */}
                        {section.enabled && (
                          <div style={{ marginTop: 'var(--space-2)', paddingTop: 'var(--space-2)', borderTop: '1px dashed var(--border-color)' }}>
                            {totalCount === 0 ? (
                              <div style={{ padding: '12px', border: '1px dashed var(--border-color)', borderRadius: '4px', textAlign: 'center', opacity: 0.6, fontSize: '0.85rem' }}>
                                No data available in this section. Add items in the corresponding panel first.
                              </div>
                            ) : (
                              <>
                                {/* Selection Actions toolbar */}
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                                  <button
                                    onClick={() => handleSelectAll(actualIndexInConfig)}
                                    className="btn btn-secondary"
                                    style={{ padding: '4px 8px', fontSize: '0.75rem', minWidth: 'auto', flex: 1 }}
                                  >
                                    ☑️ Select All
                                  </button>
                                  <button
                                    onClick={() => handleClearSelection(actualIndexInConfig)}
                                    className="btn btn-secondary"
                                    style={{ padding: '4px 8px', fontSize: '0.75rem', minWidth: 'auto', flex: 1 }}
                                    title="Clear selection to exclude this section from preview"
                                  >
                                    📭 Clear Selection
                                  </button>
                                </div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.6, marginBottom: '10px', lineHeight: '1.3' }}>
                                  💡 Select items manually to include them in this CV. Empty selection means this section will not appear in the preview. Use Select All only if you really want to include all items.
                                </div>

                                <input 
                                  type="text" 
                                  placeholder={`Search and select ${section.id}...`}
                                  value={searchQueries[section.id] || ''}
                                  onChange={(e) => setSearchQueries({...searchQueries, [section.id]: e.target.value})}
                                  className="form-input"
                                  style={{ width: '100%', marginBottom: '10px', boxSizing: 'border-box' }}
                                />

                                {searchQueries[section.id] && (
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px', padding: '8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
                                    {sectionData.filter(s => {
                                       const label = s.name || s.title || s.role || s.degree || '';
                                       return label.toLowerCase().includes((searchQueries[section.id] || '').toLowerCase()) && !section.selectedIds?.includes(s.id);
                                    }).slice(0, 10).map(item => {
                                      const label = getItemLabel(section.id, item);
                                      const meta = getItemMeta(section.id, item);
                                      return (
                                        <button
                                          key={item.id}
                                          onClick={() => {
                                            toggleItemSelection(actualIndexInConfig, item.id);
                                            setSearchQueries({...searchQueries, [section.id]: ''});
                                          }}
                                          style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center', 
                                            width: '100%', 
                                            padding: '8px 12px', 
                                            fontSize: '0.8rem', 
                                            borderRadius: '6px', 
                                            border: '1px dashed var(--primary-color)', 
                                            background: 'rgba(59, 130, 246, 0.05)', 
                                            color: 'var(--primary-color)', 
                                            cursor: 'pointer', 
                                            textAlign: 'left' 
                                          }}
                                        >
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                            <span style={{ fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{label}</span>
                                            {meta && <span style={{ fontSize: '0.7rem', opacity: 0.8, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{meta}</span>}
                                          </div>
                                          <span style={{ fontSize: '1rem', fontWeight: 'bold', marginLeft: '8px' }}>+</span>
                                        </button>
                                      );
                                    })}
                                    {sectionData.filter(s => {
                                       const label = s.name || s.title || s.role || s.degree || '';
                                       return label.toLowerCase().includes((searchQueries[section.id] || '').toLowerCase()) && !section.selectedIds?.includes(s.id);
                                    }).length === 0 && (
                                      <div style={{ padding: '6px', textAlign: 'center', opacity: 0.6, fontSize: '0.8rem' }}>
                                        🔍 No items match "{searchQueries[section.id]}"
                                      </div>
                                    )}
                                  </div>
                                )}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                                  {(section.selectedIds || []).map(id => {
                                    const item = sectionData.find(s => s.id === id);
                                    if (!item) return null;
                                    const label = getItemLabel(section.id, item);
                                    const meta = getItemMeta(section.id, item);
                                    
                                    return (
                                      <div 
                                        key={id} 
                                        style={{ 
                                          display: 'flex', 
                                          justifyContent: 'space-between', 
                                          alignItems: 'center', 
                                          padding: '6px 12px', 
                                          fontSize: '0.85rem', 
                                          borderRadius: '6px', 
                                          backgroundColor: 'var(--bg-color)', 
                                          border: '1px solid var(--border-color)' 
                                        }}
                                      >
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                                          <span style={{ fontWeight: '600', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                            {label}
                                          </span>
                                          {meta && (
                                            <span style={{ fontSize: '0.75rem', opacity: 0.7, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                                              {meta}
                                            </span>
                                          )}
                                        </div>
                                        <button 
                                          onClick={() => toggleItemSelection(actualIndexInConfig, id)}
                                          style={{ 
                                            background: 'transparent', 
                                            border: 'none', 
                                            color: '#ef4444', 
                                            fontWeight: 'bold', 
                                            fontSize: '1rem', 
                                            cursor: 'pointer', 
                                            padding: '0 4px', 
                                            marginLeft: '8px' 
                                          }}
                                          title="Remove item"
                                        >
                                          ×
                                        </button>
                                      </div>
                                    );
                                  })}
                                  {selectedCount === 0 && (
                                    <div style={{ padding: '8px 12px', border: '1px dashed var(--border-color)', borderRadius: '4px', fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic', textAlign: 'center' }}>
                                      💡 Empty selection. This section will not appear in the preview.
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
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
                      Jika Anda memilih terlalu banyak item (terutama work experience atau projects), konten mungkin akan melebihi batas bawah halaman pratinjau A4 di sebelah kanan dan akan terpotong pada cetakan fisik/PDF. Silakan kurangi item yang dipilih jika terjadi overflow visual.
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
        <div className="cv-preview-outer-wrapper">
          <div className="cv-scale-container">
            <div className="cv-scale-wrapper">
              <div id="cv-print-area" className="cv-preview-container">
              
              {/* Page 1 */}
              <div className="cv-page" data-page="1">
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '5mm' }}>
                  <h1 style={{ margin: '0 0 1mm 0', fontSize: '18pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {activeVariant?.displayName || data.profile?.name || 'YOUR NAME'}
                  </h1>
                  <div style={{ fontSize: '10pt', marginBottom: '1.5mm', fontWeight: 'bold', color: '#111' }}>
                    {activeVariant?.professionalTitle || data.profile?.title || 'Professional Title'} 
                    {activeVariant?.targetRole && ` | ${activeVariant?.targetRole}`}
                  </div>
                  <div style={{ fontSize: '9pt', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', color: '#222' }}>
                    {contactLinks.map((item, i, arr) => (
                      <React.Fragment key={i}>
                        <span>{item.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                        {i < arr.length - 1 && <span>•</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {activeVariant?.summary && (
                  <div className="cv-print-section" style={{ marginBottom: '4mm' }}>
                    <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', margin: '0 0 2mm 0', paddingBottom: '0.5mm', letterSpacing: '0.5px' }}>
                      Professional Summary
                    </h2>
                    <div style={{ fontSize: '9pt', textAlign: 'justify', whiteSpace: 'pre-line', color: '#111' }}>
                      {activeVariant?.summary}
                    </div>
                  </div>
                )}

                {totalSelectedItems === 0 && (
                  <div className="cv-empty-preview-note">
                    <p style={{ margin: 0, fontSize: '10pt', color: '#ef4444', fontWeight: 'bold' }}>
                      No database items selected yet.
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '9pt', color: '#7f1d1d' }}>
                      Choose Experience, Skills, Projects, Education, or Credentials from the "Sections & Items" tab to build a tailored CV.
                    </p>
                  </div>
                )}

                {/* Page 1 Dynamic Sections ordered by configuration */}
                {sortedSections
                  .filter(s => ['skills', 'experience'].includes(s.id))
                  .map(s => renderSectionById(s.id))}
              </div>

              {/* Page 2 */}
              <div className="cv-page" data-page="2">
                {/* Page 2 Dynamic Sections ordered by configuration */}
                {sortedSections
                  .filter(s => ['projects', 'education', 'credentials'].includes(s.id))
                  .map(s => renderSectionById(s.id))}
              </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCvBuilder;

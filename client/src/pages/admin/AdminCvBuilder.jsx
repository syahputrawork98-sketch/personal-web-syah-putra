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
          setCvConfig(configRes);
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
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save config');
    } finally {
      setSaving(false);
    }
  };

  const moveSection = (index, direction) => {
    const newSections = [...cvConfig.sections];
    if (direction === 'up' && index > 0) {
      // Swap order values
      const tempOrder = newSections[index].order;
      newSections[index].order = newSections[index - 1].order;
      newSections[index - 1].order = tempOrder;
      
      // Swap array positions
      const temp = newSections[index];
      newSections[index] = newSections[index - 1];
      newSections[index - 1] = temp;
    } else if (direction === 'down' && index < newSections.length - 1) {
      // Swap order values
      const tempOrder = newSections[index].order;
      newSections[index].order = newSections[index + 1].order;
      newSections[index + 1].order = tempOrder;
      
      // Swap array positions
      const temp = newSections[index];
      newSections[index] = newSections[index + 1];
      newSections[index + 1] = temp;
    }
    setCvConfig({ ...cvConfig, sections: newSections });
  };

  const toggleSection = (index) => {
    const newSections = [...cvConfig.sections];
    newSections[index].enabled = !newSections[index].enabled;
    setCvConfig({ ...cvConfig, sections: newSections });
  };

  const toggleItemSelection = (sectionIndex, itemId) => {
    const newSections = [...cvConfig.sections];
    const section = newSections[sectionIndex];
    if (!section.selectedIds) section.selectedIds = [];
    
    if (section.selectedIds.includes(itemId)) {
      section.selectedIds = section.selectedIds.filter(id => id !== itemId);
    } else {
      section.selectedIds.push(itemId);
    }
    setCvConfig({ ...cvConfig, sections: newSections });
  };

  if (loading || !cvConfig) return <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>Loading CV Data...</div>;

  // Ensure sections are sorted by order for UI
  const sortedSections = [...cvConfig.sections].sort((a, b) => a.order - b.order);

  // Helper to get data array for a section id
  const getDataForSection = (id) => {
    if (id === 'experience') return data.experience;
    if (id === 'education') return data.education;
    if (id === 'skills') return data.skills;
    if (id === 'projects') return data.projects;
    if (id === 'credentials') return data.certifications;
    return [];
  };

  // Helper to render section title nicely
  const formatSectionTitle = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--space-2) 0' }}>CV Builder</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>Atur konfigurasi CV Anda (urutan dan item terpilih) sebelum dicetak.</p>
        </div>
        <button 
          onClick={handleSaveConfig} 
          disabled={saving}
          className="btn btn-primary"
        >
          {saving ? 'Saving...' : 'Save Config'}
        </button>
      </div>

      {error && <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: 'var(--space-4)', borderRadius: '4px' }}>{error}</div>}
      {successMsg && <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: 'var(--space-4)', borderRadius: '4px' }}>{successMsg}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
        
        {/* Left Panel: Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Professional Summary</h3>
            <textarea 
              value={cvConfig.summary || ''}
              onChange={(e) => setCvConfig({ ...cvConfig, summary: e.target.value })}
              placeholder="Write a brief professional summary to show at the top of your CV..."
              style={{ width: '100%', minHeight: '80px', padding: 'var(--space-2)', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit' }}
            />
          </div>

          <h3 style={{ margin: 'var(--space-4) 0 0 0' }}>Section Ordering & Filtering</h3>
          <p style={{ margin: '0 0 var(--space-4) 0', fontSize: '0.85rem', opacity: 0.7 }}>
            Centang bagian yang ingin ditampilkan. Jika Anda tidak memilih item satupun dalam sebuah section, maka <b>semua item</b> akan ditampilkan secara default.
          </p>

          {sortedSections.map((section, index) => {
            const isProfile = section.id === 'profile';
            const sectionData = getDataForSection(section.id);
            const actualIndexInConfig = cvConfig.sections.findIndex(s => s.id === section.id);

            return (
              <div key={section.id} className="card" style={{ padding: 'var(--space-4)', opacity: section.enabled ? 1 : 0.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isProfile ? 0 : 'var(--space-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <input 
                      type="checkbox" 
                      checked={section.enabled}
                      onChange={() => toggleSection(actualIndexInConfig)}
                      style={{ cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <h4 style={{ margin: 0 }}>{formatSectionTitle(section.id)}</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button 
                      onClick={() => moveSection(actualIndexInConfig, 'up')}
                      disabled={index === 0}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      ↑
                    </button>
                    <button 
                      onClick={() => moveSection(actualIndexInConfig, 'down')}
                      disabled={index === sortedSections.length - 1}
                      className="btn btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                    >
                      ↓
                    </button>
                  </div>
                </div>

                {/* Sub-items for non-profile sections */}
                {!isProfile && section.enabled && sectionData.length > 0 && (
                  <div style={{ marginTop: 'var(--space-3)', paddingLeft: '32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {sectionData.map(item => {
                      const isSelected = section.selectedIds?.includes(item.id);
                      let itemLabel = item.title || item.name || item.role || item.degree || 'Item';
                      if (item.company) itemLabel += ` at ${item.company}`;
                      if (item.school) itemLabel += ` at ${item.school}`;
                      
                      return (
                        <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => toggleItemSelection(actualIndexInConfig, item.id)}
                          />
                          {itemLabel}
                        </label>
                      );
                    })}
                  </div>
                )}
                {!isProfile && section.enabled && sectionData.length === 0 && (
                  <div style={{ marginTop: 'var(--space-3)', paddingLeft: '32px', fontSize: '0.85rem', opacity: 0.6 }}>
                    No items available in database.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Panel: A4 Preview Skeleton */}
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          maxWidth: '210mm',
          aspectRatio: '210 / 297',
          padding: '15mm',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          color: 'black',
          fontFamily: '"Times New Roman", Times, serif',
          overflowY: 'auto',
          boxSizing: 'border-box'
        }}>
          {sortedSections.filter(s => s.enabled).map(section => {
            if (section.id === 'profile') {
              return (
                <div key="profile" style={{ textAlign: 'center', marginBottom: '8mm', borderBottom: '2px solid black', paddingBottom: '4mm' }}>
                  <h1 style={{ margin: 0, fontSize: '24pt', fontWeight: 'bold' }}>{data.profile?.name || 'YOUR NAME'}</h1>
                  <div style={{ fontSize: '12pt', opacity: 0.8, marginTop: '2mm', textTransform: 'uppercase' }}>{data.profile?.title || 'Professional Title'}</div>
                  <div style={{ fontSize: '9pt', marginTop: '3mm' }}>
                    {data.contact?.email || 'email@example.com'} • {data.contact?.phone || '+62 000-0000-0000'} • {data.contact?.location || 'Location, Country'}
                  </div>
                  {cvConfig.summary && (
                    <div style={{ marginTop: '4mm', fontSize: '10pt', textAlign: 'justify', lineHeight: 1.5 }}>
                      {cvConfig.summary}
                    </div>
                  )}
                </div>
              );
            }

            const rawData = getDataForSection(section.id);
            // If selectedIds is empty, show all. Otherwise filter.
            const displayData = (section.selectedIds && section.selectedIds.length > 0) 
              ? rawData.filter(item => section.selectedIds.includes(item.id))
              : rawData;

            if (displayData.length === 0) return null;

            return (
              <div key={section.id} style={{ marginBottom: '6mm' }}>
                <h2 style={{ fontSize: '13pt', margin: '0 0 3mm 0', borderBottom: '1px solid #ccc', textTransform: 'uppercase', paddingBottom: '1mm' }}>
                  {formatSectionTitle(section.id)}
                </h2>
                
                {section.id === 'experience' && displayData.map(exp => (
                  <div key={exp.id} style={{ marginBottom: '3mm' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                      <span>{exp.role}</span>
                      <span>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>{exp.company}</div>
                    {exp.description && <p style={{ fontSize: '9pt', margin: '1mm 0 0 0', lineHeight: 1.4 }}>{exp.description}</p>}
                  </div>
                ))}

                {section.id === 'education' && displayData.map(edu => (
                  <div key={edu.id} style={{ marginBottom: '3mm' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                      <span>{edu.school}</span>
                      <span>{edu.period}</span>
                    </div>
                    <div style={{ fontSize: '10pt' }}>{edu.degree}</div>
                    {edu.description && <p style={{ fontSize: '9pt', margin: '1mm 0 0 0', lineHeight: 1.4 }}>{edu.description}</p>}
                  </div>
                ))}

                {section.id === 'skills' && (
                  <div style={{ fontSize: '10pt', lineHeight: 1.5 }}>
                    {displayData.map(s => s.name).join(' • ')}
                  </div>
                )}

                {section.id === 'projects' && displayData.map(proj => (
                  <div key={proj.id} style={{ marginBottom: '3mm' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                      {proj.title}
                    </div>
                    <div style={{ fontSize: '9pt', fontStyle: 'italic', opacity: 0.8 }}>{proj.category}</div>
                    {proj.description && <p style={{ fontSize: '9pt', margin: '1mm 0 0 0', lineHeight: 1.4 }}>{proj.description}</p>}
                  </div>
                ))}
                
                {section.id === 'credentials' && displayData.map(cert => (
                  <div key={cert.id} style={{ marginBottom: '3mm' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                      <span>{cert.title}</span>
                      <span>{cert.issuedDate ? new Date(cert.issuedDate).getFullYear() : ''}</span>
                    </div>
                    <div style={{ fontSize: '10pt' }}>{cert.issuer}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminCvBuilder;

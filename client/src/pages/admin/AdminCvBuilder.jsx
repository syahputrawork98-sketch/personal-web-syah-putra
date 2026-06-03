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
          const ensuredSections = configRes.sections.map(s => {
            if (s.id === 'experience' || s.id === 'education') {
              return { ...s, enabled: true };
            }
            return s;
          });
          setCvConfig({ ...configRes, sections: ensuredSections });
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
    setCvConfig({ ...cvConfig, sections: newSections });
  };

  const toggleSection = (index) => {
    const newSections = [...cvConfig.sections];
    if (newSections[index].id === 'experience' || newSections[index].id === 'education') return;
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

  const sortedSections = [...cvConfig.sections].sort((a, b) => a.order - b.order);

  const getDataForSection = (id) => {
    if (id === 'experience') return data.experience;
    if (id === 'education') return data.education;
    if (id === 'skills') return data.skills;
    if (id === 'projects') return data.projects;
    if (id === 'credentials') return data.certifications;
    return [];
  };

  const formatSectionTitle = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--space-2) 0' }}>CV Builder</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>Atur dan sesuaikan isi CV Anda agar ATS-friendly sebelum dicetak.</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button 
            onClick={() => window.print()} 
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
        
        {/* Left Panel: Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', minWidth: 0 }}>
          
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Manual CV Identity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>CV Display Name</label>
                <input 
                  type="text" 
                  value={cvConfig.displayName || ''} 
                  onChange={(e) => setCvConfig({...cvConfig, displayName: e.target.value})} 
                  placeholder={data.profile?.name || 'Your Name'} 
                  className="form-input" 
                  style={{ width: '100%', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Professional Title</label>
                <input 
                  type="text" 
                  value={cvConfig.professionalTitle || ''} 
                  onChange={(e) => setCvConfig({...cvConfig, professionalTitle: e.target.value})} 
                  placeholder={data.profile?.title || 'e.g. Full Stack Developer'} 
                  className="form-input" 
                  style={{ width: '100%', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Target Role (Optional)</label>
                <input 
                  type="text" 
                  value={cvConfig.targetRole || ''} 
                  onChange={(e) => setCvConfig({...cvConfig, targetRole: e.target.value})} 
                  placeholder="e.g. Senior Frontend Engineer" 
                  className="form-input" 
                  style={{ width: '100%', boxSizing: 'border-box' }} 
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 'bold' }}>Optional Links (LinkedIn, GitHub, Portfolio)</label>
                <input 
                  type="text" 
                  value={cvConfig.links || ''} 
                  onChange={(e) => setCvConfig({...cvConfig, links: e.target.value})} 
                  placeholder="e.g. github.com/username | linkedin.com/in/username" 
                  className="form-input" 
                  style={{ width: '100%', boxSizing: 'border-box' }} 
                />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Manual Professional Summary</h3>
            <textarea 
              value={cvConfig.summary || ''}
              onChange={(e) => setCvConfig({ ...cvConfig, summary: e.target.value })}
              placeholder="Write a brief professional summary..."
              style={{ width: '100%', minHeight: '100px', padding: 'var(--space-2)', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-2) 0' }}>Database Sections & Ordering</h3>
            <p style={{ margin: '0 0 var(--space-4) 0', fontSize: '0.85rem', opacity: 0.7 }}>
              Experience dan Education selalu aktif secara default. Pilih item yang ingin ditampilkan, atau biarkan kosong untuk menampilkan semua data.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {sortedSections.map((section, index) => {
                const isProfile = section.id === 'profile';
                if (isProfile) return null; // Handled by Manual Identity

                const sectionData = getDataForSection(section.id);
                const actualIndexInConfig = cvConfig.sections.findIndex(s => s.id === section.id);
                const isMandatory = section.id === 'experience' || section.id === 'education';

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

                    {/* Unified Selector Area */}
                    {section.enabled && (
                      <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px dashed var(--border-color)' }}>
                        <input 
                          type="text" 
                          placeholder={`Search and select ${section.id}...`}
                          value={searchQueries[section.id] || ''}
                          onChange={(e) => setSearchQueries({...searchQueries, [section.id]: e.target.value})}
                          className="form-input"
                          style={{ width: '100%', marginBottom: '12px', boxSizing: 'border-box' }}
                        />
                        {searchQueries[section.id] && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px', padding: '8px', backgroundColor: 'var(--bg-color)', borderRadius: '4px' }}>
                            {sectionData.filter(s => {
                               const label = s.name || s.title || s.role || s.degree || '';
                               return label.toLowerCase().includes((searchQueries[section.id] || '').toLowerCase()) && !section.selectedIds?.includes(s.id);
                            }).slice(0, 10).map(item => {
                              let itemLabel = item.name || item.title || item.role || item.degree || 'Item';
                              if (item.company) itemLabel += ` at ${item.company}`;
                              if (item.school) itemLabel += ` at ${item.school}`;
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => {
                                    toggleItemSelection(actualIndexInConfig, item.id);
                                    setSearchQueries({...searchQueries, [section.id]: ''});
                                  }}
                                  style={{ padding: '4px 10px', fontSize: '0.8rem', borderRadius: '16px', border: '1px solid var(--primary-color)', background: 'transparent', color: 'var(--primary-color)', cursor: 'pointer', textAlign: 'left' }}
                                >
                                  + {itemLabel}
                                </button>
                              );
                            })}
                            {sectionData.filter(s => {
                               const label = s.name || s.title || s.role || s.degree || '';
                               return label.toLowerCase().includes((searchQueries[section.id] || '').toLowerCase()) && !section.selectedIds?.includes(s.id);
                            }).length === 0 && (
                              <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>No items found.</span>
                            )}
                          </div>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {(section.selectedIds || []).map(id => {
                            const item = sectionData.find(s => s.id === id);
                            if (!item) return null;
                            let itemLabel = item.name || item.title || item.role || item.degree || 'Item';
                            
                            return (
                              <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px', fontSize: '0.8rem', borderRadius: '16px', backgroundColor: 'var(--primary-color)', color: 'white' }}>
                                <span>{itemLabel}</span>
                                <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => toggleItemSelection(actualIndexInConfig, id)}>×</span>
                              </div>
                            );
                          })}
                          {(section.selectedIds?.length === 0) && (
                            <span style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic' }}>
                              No specific items selected (all items will be shown by default).
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Panel: ATS Preview */}
        <div 
          id="cv-print-area"
          style={{ 
          backgroundColor: '#fff', 
          width: '100%', 
          maxWidth: '210mm',
          aspectRatio: '210 / 297',
          padding: '20mm',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          color: '#000',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          overflowY: 'auto',
          boxSizing: 'border-box',
          lineHeight: 1.5
        }}>
          {/* Header Section */}
          <div style={{ textAlign: 'center', marginBottom: '8mm' }}>
            <h1 style={{ margin: '0 0 2mm 0', fontSize: '22pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {cvConfig.displayName || data.profile?.name || 'YOUR NAME'}
            </h1>
            <div style={{ fontSize: '12pt', marginBottom: '3mm', fontWeight: 'bold', color: '#333' }}>
              {cvConfig.professionalTitle || data.profile?.title || 'Professional Title'} 
              {cvConfig.targetRole && ` | ${cvConfig.targetRole}`}
            </div>
            <div style={{ fontSize: '10pt', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', color: '#444' }}>
              <span>{data.contact?.email || 'email@example.com'}</span>
              <span>•</span>
              <span>{data.contact?.phone || '+62 000-0000-0000'}</span>
              <span>•</span>
              <span>{data.contact?.location || 'Location, Country'}</span>
              {cvConfig.links && (
                <>
                  <span>•</span>
                  <span>{cvConfig.links}</span>
                </>
              )}
            </div>
          </div>

          {cvConfig.summary && (
            <div style={{ marginBottom: '6mm' }}>
              <h2 style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1.5px solid #000', margin: '0 0 3mm 0', paddingBottom: '1mm', letterSpacing: '0.5px' }}>
                Professional Summary
              </h2>
              <div style={{ fontSize: '10pt', textAlign: 'justify', whiteSpace: 'pre-line' }}>
                {cvConfig.summary}
              </div>
            </div>
          )}

          {/* Dynamic Sections */}
          {sortedSections.filter(s => s.enabled && s.id !== 'profile').map(section => {
            const rawData = getDataForSection(section.id);
            const displayData = (section.selectedIds && section.selectedIds.length > 0) 
              ? rawData.filter(item => section.selectedIds.includes(item.id))
              : rawData;

            if (displayData.length === 0) return null;

            return (
              <div key={section.id} style={{ marginBottom: '6mm' }}>
                <h2 style={{ fontSize: '13pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1.5px solid #000', margin: '0 0 3mm 0', paddingBottom: '1mm', letterSpacing: '0.5px' }}>
                  {formatSectionTitle(section.id)}
                </h2>
                
                {section.id === 'experience' && displayData.map(exp => (
                  <div key={exp.id} className="cv-print-item" style={{ marginBottom: '4mm' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                      <span>{exp.role}</span>
                      <span>{exp.period}</span>
                    </div>
                    <div style={{ fontSize: '10pt', fontStyle: 'italic', marginBottom: '1mm' }}>{exp.company}</div>
                    {exp.description && <p style={{ fontSize: '10pt', margin: '0', whiteSpace: 'pre-line' }}>{exp.description}</p>}
                  </div>
                ))}

                {section.id === 'education' && displayData.map(edu => (
                  <div key={edu.id} className="cv-print-item" style={{ marginBottom: '4mm' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                      <span>{edu.school}</span>
                      <span>{edu.period}</span>
                    </div>
                    <div style={{ fontSize: '10pt', marginBottom: '1mm' }}>{edu.degree}</div>
                    {edu.description && <p style={{ fontSize: '10pt', margin: '0', whiteSpace: 'pre-line' }}>{edu.description}</p>}
                  </div>
                ))}

                {section.id === 'skills' && (
                  <div style={{ fontSize: '10pt' }}>
                    {displayData.map(s => s.name).join(', ')}
                  </div>
                )}

                {section.id === 'projects' && displayData.map(proj => (
                  <div key={proj.id} className="cv-print-item" style={{ marginBottom: '4mm' }}>
                    <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                      {proj.title}
                    </div>
                    <div style={{ fontSize: '10pt', fontStyle: 'italic', marginBottom: '1mm', color: '#555' }}>{proj.category}</div>
                    {proj.description && <p style={{ fontSize: '10pt', margin: '0', whiteSpace: 'pre-line' }}>{proj.description}</p>}
                  </div>
                ))}
                
                {section.id === 'credentials' && displayData.map(cert => (
                  <div key={cert.id} className="cv-print-item" style={{ marginBottom: '3mm' }}>
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

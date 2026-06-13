import React from 'react';
import { buildContactLinks } from '../../../utils/cvBuilder/cvContactUtils';
import { getDisplayItems } from '../../../utils/cvBuilder/cvSectionUtils';

const CvPreview = ({ activeVariant, data, totalSelectedItems }) => {
  if (!activeVariant) return null;

  const sortedSections = [...activeVariant.sections].sort((a, b) => a.order - b.order);

  const contactLinks = buildContactLinks(activeVariant, data.contact);

  const renderSkillsSection = (items) => {
    if (!items || items.length === 0) return null;
    return (
      <div key="skills" className="cv-print-section" style={{ marginBottom: '4mm' }}>
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
      <div key="experience" className="cv-print-section" style={{ marginBottom: '4mm' }}>
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
      <div key="projects" className="cv-print-section" style={{ marginBottom: '4mm' }}>
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
      <div key="education" className="cv-print-section" style={{ marginBottom: '4mm' }}>
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
      <div key="credentials" className="cv-print-section" style={{ marginBottom: '3mm' }}>
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
    const displayItems = getDisplayItems(sectionId, activeVariant, data);
    if (sectionId === 'skills') return renderSkillsSection(displayItems);
    if (sectionId === 'experience') return renderExperienceSection(displayItems);
    if (sectionId === 'projects') return renderProjectsSection(displayItems);
    if (sectionId === 'education') return renderEducationSection(displayItems);
    if (sectionId === 'credentials') return renderCredentialsSection(displayItems);
    return null;
  };

  return (
    <div className="cv-preview-outer-wrapper">
      <div className="cv-scale-container" style={{ height: 'calc(297mm * 0.75)' }}>
        <div className="cv-scale-wrapper" style={{ height: '297mm' }}>
          <div id="cv-print-area" className="cv-preview-container">
            {/* Single page flow document */}
            <div className="cv-page" data-page="1">
              {/* Header Section */}
              <div style={{ textAlign: 'center', marginBottom: '5mm' }}>
                <h1 style={{ margin: '0 0 1mm 0', fontSize: '18pt', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {activeVariant.displayName || data.profile?.name || 'YOUR NAME'}
                </h1>
                <div style={{ fontSize: '10pt', marginBottom: '1.5mm', fontWeight: 'bold', color: '#111' }}>
                  {activeVariant.professionalTitle || data.profile?.title || 'Professional Title'} 
                  {activeVariant.targetRole && ` | ${activeVariant.targetRole}`}
                </div>
                <div style={{ fontSize: '9pt', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', color: '#222' }}>
                  {contactLinks.map((item, i, arr) => (
                    <React.Fragment key={i}>
                      <span>{String(item).replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                      {i < arr.length - 1 && <span>•</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {activeVariant.summary && (
                <div className="cv-print-section" style={{ marginBottom: '4mm' }}>
                  <h2 style={{ fontSize: '11pt', fontWeight: 'bold', textTransform: 'uppercase', borderBottom: '1px solid #111', margin: '0 0 2mm 0', paddingBottom: '0.5mm', letterSpacing: '0.5px' }}>
                    Professional Summary
                  </h2>
                  <div style={{ fontSize: '9pt', textAlign: 'justify', whiteSpace: 'pre-line', color: '#111' }}>
                    {activeVariant.summary}
                  </div>
                </div>
              )}

              {/* Helper note for empty preview */}
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

              {/* Dynamic Sections Flow ordered by active variant sections */}
              {sortedSections.map(s => renderSectionById(s.id))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvPreview;

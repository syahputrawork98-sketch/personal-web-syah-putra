import React, { useState, useEffect } from 'react';
import { 
  getAdminProjects, 
  getAdminSkills, 
  getAdminExperiences, 
  getAdminEducation, 
  getAdminCertifications,
  getAdminProfile,
  getAdminContact
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          contactRes
        ] = await Promise.all([
          getAdminProjects(),
          getAdminSkills(),
          getAdminExperiences(),
          getAdminEducation(),
          getAdminCertifications(),
          getAdminProfile(),
          getAdminContact()
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
      } catch (err) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  if (loading) return <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>Loading CV Data...</div>;
  if (error) return <div style={{ padding: 'var(--space-8)', color: '#dc2626' }}>Error: {error}</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 'var(--space-6)' }}>
      <div>
        <h1 style={{ margin: '0 0 var(--space-2) 0' }}>CV Builder</h1>
        <p style={{ margin: 0, opacity: 0.7 }}>Susun CV dari data portfolio yang sudah tersimpan di database.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'start' }}>
        
        {/* Left Panel: Config */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Profile & Contact</h3>
            <div style={{ fontSize: '0.9rem' }}>
              <div><strong>Name:</strong> {data.profile?.name || '-'}</div>
              <div><strong>Title:</strong> {data.profile?.title || '-'}</div>
              <div><strong>Email:</strong> {data.contact?.email || '-'}</div>
              <div><strong>Phone:</strong> {data.contact?.phone || '-'}</div>
            </div>
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Experience ({data.experience.length})</h3>
            {data.experience.length === 0 ? (
              <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>No experience found.</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                {data.experience.slice(0, 3).map(e => <li key={e.id}>{e.role} at {e.company}</li>)}
                {data.experience.length > 3 && <li>... and {data.experience.length - 3} more</li>}
              </ul>
            )}
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Education ({data.education.length})</h3>
            {data.education.length === 0 ? (
              <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>No education found.</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                {data.education.map(e => <li key={e.id}>{e.degree} at {e.school}</li>)}
              </ul>
            )}
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Skills ({data.skills.length})</h3>
            {data.skills.length === 0 ? (
              <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>No skills found.</div>
            ) : (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {data.skills.map(s => <span key={s.id} style={{ fontSize: '0.8rem', padding: '2px 6px', background: 'var(--bg-color)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{s.name}</span>)}
              </div>
            )}
          </div>

          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Projects ({data.projects.length})</h3>
            {data.projects.length === 0 ? (
              <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>No projects found.</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                {data.projects.slice(0, 3).map(p => <li key={p.id}>{p.title}</li>)}
                {data.projects.length > 3 && <li>... and {data.projects.length - 3} more</li>}
              </ul>
            )}
          </div>
          
          <div className="card" style={{ padding: 'var(--space-4)' }}>
            <h3 style={{ margin: '0 0 var(--space-4) 0' }}>Credentials ({data.certifications.length})</h3>
            {data.certifications.length === 0 ? (
              <div style={{ fontSize: '0.9rem', opacity: 0.6 }}>No credentials found.</div>
            ) : (
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem' }}>
                {data.certifications.slice(0, 3).map(c => <li key={c.id}>{c.title}</li>)}
                {data.certifications.length > 3 && <li>... and {data.certifications.length - 3} more</li>}
              </ul>
            )}
          </div>
        </div>

        {/* Right Panel: A4 Preview Skeleton */}
        <div style={{ 
          backgroundColor: 'white', 
          width: '100%', 
          maxWidth: '210mm',
          aspectRatio: '210 / 297',
          padding: '20mm',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          color: 'black',
          fontFamily: '"Times New Roman", Times, serif',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '10mm', borderBottom: '2px solid black', paddingBottom: '5mm' }}>
            <h1 style={{ margin: 0, fontSize: '24pt', fontWeight: 'bold' }}>{data.profile?.name || 'YOUR NAME'}</h1>
            <div style={{ fontSize: '12pt', opacity: 0.8, marginTop: '2mm', textTransform: 'uppercase' }}>{data.profile?.title || 'Professional Title'}</div>
            <div style={{ fontSize: '9pt', marginTop: '4mm' }}>
              {data.contact?.email || 'email@example.com'} • {data.contact?.phone || '+62 000-0000-0000'} • {data.contact?.location || 'Location, Country'}
            </div>
          </div>

          {data.experience.length > 0 ? (
            <div style={{ marginBottom: '8mm' }}>
              <h2 style={{ fontSize: '14pt', margin: '0 0 4mm 0', borderBottom: '1px solid #ccc', textTransform: 'uppercase' }}>Experience</h2>
              {data.experience.slice(0, 2).map(exp => (
                <div key={exp.id} style={{ marginBottom: '4mm' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                    <span>{exp.role}</span>
                    <span>{exp.period}</span>
                  </div>
                  <div style={{ fontSize: '10pt', fontStyle: 'italic' }}>{exp.company}</div>
                  {exp.description && <p style={{ fontSize: '9pt', margin: '2mm 0 0 0', lineHeight: 1.4 }}>{exp.description.substring(0, 150)}...</p>}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginBottom: '8mm', color: '#888', fontStyle: 'italic', fontSize: '10pt' }}>No Experience Data Selected</div>
          )}

          {data.education.length > 0 ? (
            <div style={{ marginBottom: '8mm' }}>
              <h2 style={{ fontSize: '14pt', margin: '0 0 4mm 0', borderBottom: '1px solid #ccc', textTransform: 'uppercase' }}>Education</h2>
              {data.education.slice(0, 2).map(edu => (
                <div key={edu.id} style={{ marginBottom: '4mm' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '11pt' }}>
                    <span>{edu.school}</span>
                    <span>{edu.period}</span>
                  </div>
                  <div style={{ fontSize: '10pt' }}>{edu.degree}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ marginBottom: '8mm', color: '#888', fontStyle: 'italic', fontSize: '10pt' }}>No Education Data Selected</div>
          )}
          
          {data.skills.length > 0 ? (
            <div style={{ marginBottom: '8mm' }}>
              <h2 style={{ fontSize: '14pt', margin: '0 0 4mm 0', borderBottom: '1px solid #ccc', textTransform: 'uppercase' }}>Skills</h2>
              <div style={{ fontSize: '10pt', lineHeight: 1.5 }}>
                {data.skills.map(s => s.name).join(' • ')}
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: '8mm', color: '#888', fontStyle: 'italic', fontSize: '10pt' }}>No Skills Data Selected</div>
          )}

          {data.projects.length > 0 ? (
            <div style={{ marginBottom: '8mm' }}>
              <h2 style={{ fontSize: '14pt', margin: '0 0 4mm 0', borderBottom: '1px solid #ccc', textTransform: 'uppercase' }}>Selected Projects</h2>
              {data.projects.slice(0, 2).map(proj => (
                <div key={proj.id} style={{ marginBottom: '4mm' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: '10pt', fontStyle: 'italic', opacity: 0.8 }}>{proj.category}</div>
                  {proj.description && <p style={{ fontSize: '9pt', margin: '1mm 0 0 0', lineHeight: 1.4 }}>{proj.description.substring(0, 100)}...</p>}
                </div>
              ))}
            </div>
          ) : null}

        </div>
      </div>
    </div>
  );
};

export default AdminCvBuilder;

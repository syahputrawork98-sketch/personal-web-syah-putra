import React from 'react';

const NewspaperCVWireframe = ({ variant }) => {
  if (!variant) return null;

  return (
    <div className="newspaper-cv-wireframe" style={{
      background: '#fdfbf7',
      color: '#1a1a1a',
      padding: 'var(--space-8)',
      fontFamily: '"Playfair Display", serif',
      border: '1px solid #d1d1d1',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      maxWidth: '100%',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Newspaper Lines */}
      <div style={{ borderTop: '4px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '10px 0', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>SYAH PUTRA N</span>
        <span style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>Edisi Portofolio Profesional &bull; 2026</span>
        <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>SPN</span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: '0 0 10px 0', textTransform: 'uppercase', lineHeight: 1 }}>
          {variant.title}
        </h1>
        <p style={{ fontSize: '1.2rem', fontStyle: 'italic', margin: 0, opacity: 0.8 }}>
          {variant.subtitle}
        </p>
      </div>

      <div style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', padding: '8px 0', marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
        <span>Email: hello@spn.id</span>
        <span>|</span>
        <span>GitHub: syahputranugraha</span>
        <span>|</span>
        <span>Location: Indonesia</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        {/* Left Column */}
        <div style={{ borderRight: '1px solid #e0e0e0', paddingRight: '20px' }}>
          <section style={{ marginBottom: '25px' }}>
            <h3 style={{ borderBottom: '2px solid #1a1a1a', display: 'inline-block', marginBottom: '10px', fontSize: '1.1rem', textTransform: 'uppercase' }}>Headline Utama</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.6, textAlign: 'justify' }}>
              {variant.description}
            </p>
          </section>

          <section style={{ marginBottom: '25px' }}>
            <h3 style={{ borderBottom: '2px solid #1a1a1a', display: 'inline-block', marginBottom: '10px', fontSize: '1.1rem', textTransform: 'uppercase' }}>Project Featured</h3>
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {variant.featuredProjects.map((project, i) => (
                <li key={i} style={{ marginBottom: '10px', paddingLeft: '15px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, fontWeight: 900 }}>&bull;</span>
                  <span style={{ fontWeight: 700 }}>{project}</span>
                  <p style={{ fontSize: '0.8rem', margin: '2px 0 0 0', opacity: 0.7 }}>Highlight kontribusi dan hasil utama proyek.</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div>
          <section style={{ marginBottom: '25px' }}>
            <h3 style={{ borderBottom: '2px solid #1a1a1a', display: 'inline-block', marginBottom: '10px', fontSize: '1.1rem', textTransform: 'uppercase' }}>Skill Highlight</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {variant.highlights.map((skill, i) => (
                <span key={i} style={{ fontSize: '0.8rem', background: '#f0f0f0', padding: '3px 8px', border: '1px solid #ccc' }}>{skill}</span>
              ))}
            </div>
          </section>

          <section style={{ marginBottom: '25px' }}>
            <h3 style={{ borderBottom: '2px solid #1a1a1a', display: 'inline-block', marginBottom: '10px', fontSize: '1.1rem', textTransform: 'uppercase' }}>Tools & Tech</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {variant.tools.map((tool, i) => (
                <span key={i} style={{ fontSize: '0.75rem', fontWeight: 600 }}>{tool}{i < variant.tools.length - 1 ? ',' : ''}</span>
              ))}
            </div>
          </section>

          <section>
            <h3 style={{ borderBottom: '2px solid #1a1a1a', display: 'inline-block', marginBottom: '10px', fontSize: '1.1rem', textTransform: 'uppercase' }}>Status</h3>
            <div style={{ padding: '10px', border: '2px dashed #1a1a1a', textAlign: 'center' }}>
              <span style={{ fontWeight: 900, fontSize: '1.2rem', color: '#d32f2f' }}>{variant.status.toUpperCase()}</span>
              <p style={{ fontSize: '0.7rem', margin: '5px 0 0 0' }}>Dokumen PDF sedang dalam tahap finalisasi tata letak koran.</p>
            </div>
          </section>
        </div>
      </div>

      <div style={{ marginTop: '30px', borderTop: '1px solid #1a1a1a', paddingTop: '15px', textAlign: 'center', fontSize: '0.8rem', opacity: 0.6 }}>
        Scan QR atau Kunjungi Portfolio Online di syahputran.id
      </div>
    </div>
  );
};

export default NewspaperCVWireframe;

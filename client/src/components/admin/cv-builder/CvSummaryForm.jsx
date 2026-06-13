import React from 'react';

const CvSummaryForm = ({ activeVariant, updateActiveVariant }) => {
  if (!activeVariant) return null;

  return (
    <div className="card" style={{ padding: 'var(--space-4)' }}>
      <h3 style={{ margin: '0 0 var(--space-4) 0', fontSize: '1.1rem' }}>Professional Summary</h3>
      <textarea 
        value={activeVariant.summary || ''}
        onChange={(e) => updateActiveVariant({ summary: e.target.value })}
        placeholder="Write a brief professional summary..."
        style={{ width: '100%', minHeight: '180px', padding: 'var(--space-2)', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: '1.5' }}
      />
    </div>
  );
};

export default CvSummaryForm;

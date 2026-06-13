import React from 'react';

const CvVariantSelector = ({ cvConfig, activeVariant, handleSwitchVariant, updateCvConfig }) => {
  if (!cvConfig || !activeVariant) return null;

  return (
    <div className="card" style={{ padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Active CV Variant
        </label>
        <span style={{ fontSize: '0.75rem', color: 'var(--primary-color)', fontWeight: '600' }}>
          {activeVariant.name}
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
  );
};

export default CvVariantSelector;

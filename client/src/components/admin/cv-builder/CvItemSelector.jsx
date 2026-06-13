import React from 'react';

const CvItemSelector = ({
  section,
  sectionData,
  sectionIndex,
  searchQuery,
  setSearchQuery,
  toggleItemSelection,
  handleSelectAll,
  handleClearSelection,
  getItemLabel,
  getItemMeta
}) => {
  const totalCount = sectionData.length;
  const selectedIds = section.selectedIds || [];
  const selectedCount = selectedIds.length;

  return (
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
              onClick={() => handleSelectAll(sectionIndex)}
              className="btn btn-secondary"
              style={{ padding: '4px 8px', fontSize: '0.75rem', minWidth: 'auto', flex: 1 }}
            >
              ☑️ Select All
            </button>
            <button
              onClick={() => handleClearSelection(sectionIndex)}
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ width: '100%', marginBottom: '10px', boxSizing: 'border-box' }}
          />

          {searchQuery && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px', padding: '8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
              {sectionData.filter(item => {
                 const label = getItemLabel(section.id, item) || '';
                 return label.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedIds.includes(item.id);
              }).slice(0, 10).map(item => {
                const label = getItemLabel(section.id, item);
                const meta = getItemMeta(section.id, item);
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      toggleItemSelection(sectionIndex, item.id);
                      setSearchQuery('');
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
              {sectionData.filter(item => {
                 const label = getItemLabel(section.id, item) || '';
                 return label.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedIds.includes(item.id);
              }).length === 0 && (
                <div style={{ padding: '6px', textAlign: 'center', opacity: 0.6, fontSize: '0.8rem' }}>
                  🔍 No items match "{searchQuery}"
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
            {selectedIds.map(id => {
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
                    onClick={() => toggleItemSelection(sectionIndex, id)}
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
  );
};

export default CvItemSelector;

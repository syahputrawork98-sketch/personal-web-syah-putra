import React from 'react';
import CvItemSelector from './CvItemSelector';
import { formatSectionTitle } from '../../../utils/cvBuilder/cvSectionUtils';

const CvSectionManager = ({
  activeVariant,
  sortedSections,
  getDataForSection,
  toggleSection,
  moveSection,
  searchQueries,
  setSearchQuery,
  toggleItemSelection,
  handleSelectAll,
  handleClearSelection,
  getItemLabel,
  getItemMeta
}) => {
  if (!activeVariant) return null;

  return (
    <div className="card" style={{ padding: 'var(--space-4)' }}>
      <h3 style={{ margin: '0 0 var(--space-2) 0', fontSize: '1.1rem' }}>Database Sections & Ordering</h3>
      <p style={{ margin: '0 0 var(--space-4) 0', fontSize: '0.85rem', opacity: 0.7 }}>
        Experience dan Education selalu aktif secara default. Pilih item yang ingin ditampilkan, atau biarkan kosong untuk menyembunyikan seksi tersebut.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {sortedSections.map((section, index) => {
          const isProfile = section.id === 'profile';
          if (isProfile) return null; // Handled by IdentityForm

          const sectionData = getDataForSection(section.id);
          const actualIndexInConfig = activeVariant.sections.findIndex(s => s.id === section.id);
          const isMandatory = section.id === 'experience' || section.id === 'education';

          const totalCount = sectionData.length;
          const selectedCount = section.selectedIds?.length || 0;
          const hasNoSelectedItems = selectedCount === 0;

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
                    {hasNoSelectedItems ? (
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

              {/* Item Selector */}
              {section.enabled && (
                <CvItemSelector
                  section={section}
                  sectionData={sectionData}
                  sectionIndex={actualIndexInConfig}
                  searchQuery={searchQueries[section.id] || ''}
                  setSearchQuery={(q) => setSearchQuery(section.id, q)}
                  toggleItemSelection={toggleItemSelection}
                  handleSelectAll={handleSelectAll}
                  handleClearSelection={handleClearSelection}
                  getItemLabel={getItemLabel}
                  getItemMeta={getItemMeta}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CvSectionManager;

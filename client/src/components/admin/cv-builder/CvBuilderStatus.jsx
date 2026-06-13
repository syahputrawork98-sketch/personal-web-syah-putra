import React from 'react';

const CvBuilderStatus = ({ isDirty, lastSaved, enabledSectionsCount, totalSelectedItems }) => {
  return (
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
  );
};

export default CvBuilderStatus;

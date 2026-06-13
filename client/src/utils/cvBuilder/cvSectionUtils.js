export const getDataForSection = (id, data) => {
  if (!data) return [];
  if (id === 'experience') return data.experience || [];
  if (id === 'education') return data.education || [];
  if (id === 'skills') return data.skills || [];
  if (id === 'projects') return data.projects || [];
  if (id === 'credentials') return data.certifications || [];
  return [];
};

export const getSectionConfig = (sectionId, activeVariant) => {
  if (!activeVariant || !activeVariant.sections) return null;
  return activeVariant.sections.find(s => s.id === sectionId);
};

export const getItemLabel = (sectionId, item) => {
  if (!item) return 'Item';
  if (sectionId === 'experience') return item.role;
  if (sectionId === 'projects') return item.title;
  if (sectionId === 'education') return item.degree;
  if (sectionId === 'credentials') return item.title;
  if (sectionId === 'skills') return item.name;
  return item.name || item.title || 'Item';
};

export const getItemMeta = (sectionId, item) => {
  if (!item) return '';
  if (sectionId === 'experience') {
    return `${item.company || ''} ${item.period ? `(${item.period})` : ''}`.trim();
  }
  if (sectionId === 'projects') {
    return item.category || '';
  }
  if (sectionId === 'education') {
    return `${item.school || ''} ${item.period ? `(${item.period})` : ''}`.trim();
  }
  if (sectionId === 'credentials') {
    const dateVal = item.issuedDate || item.issueDate;
    const year = dateVal ? new Date(dateVal).getFullYear() : '';
    return `${item.issuer || ''} ${year ? `(${year})` : ''}`.trim();
  }
  return '';
};

export const getDisplayItems = (sectionId, activeVariant, data) => {
  const section = getSectionConfig(sectionId, activeVariant);
  if (!section || !section.enabled) return [];
  
  const rawItems = getDataForSection(sectionId, data);
  const selectedIds = section.selectedIds || [];
  
  if (selectedIds.length > 0) {
    return selectedIds
      .map(id => rawItems.find(item => item.id === id))
      .filter(Boolean);
  }
  
  return []; // Return empty array if selectedIds is empty (Manual Curated Mode)
};
export const formatSectionTitle = (id) => {
  return id.charAt(0).toUpperCase() + id.slice(1);
};

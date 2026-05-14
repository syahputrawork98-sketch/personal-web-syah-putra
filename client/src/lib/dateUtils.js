/**
 * Format date string to short month and year (e.g., Jan 2024)
 * @param {string} dateString 
 * @returns {string}
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('id-ID', {
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    return '';
  }
};

/**
 * Get display date string for an experience object
 * @param {object} exp 
 * @returns {string}
 */
export const getExperienceDisplayDate = (exp) => {
  if (!exp) return '';
  if (exp.isLocal) return exp.displayDate || '';
  
  const start = formatDate(exp.startDate);
  const end = exp.isCurrent ? 'Sekarang' : formatDate(exp.endDate);
  
  if (!start) return end || '';
  return `${start} ${end ? '– ' + end : ''}`;
};

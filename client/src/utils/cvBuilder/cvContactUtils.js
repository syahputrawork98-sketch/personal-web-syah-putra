export const buildContactLinks = (activeVariant, dataContact) => {
  if (!activeVariant) return [];

  const previewEmail = activeVariant.email || dataContact?.email || '';
  const previewPhone = activeVariant.phone || dataContact?.phone || '';
  const previewLocation = activeVariant.location || dataContact?.location || '';
  const previewWebsite = activeVariant.website || dataContact?.website || '';
  const previewLinkedin = activeVariant.linkedin || dataContact?.linkedin || '';
  
  // Clean up github if it contains the LinkedIn bit.ly link
  let previewGithub = activeVariant.github || dataContact?.github || '';
  if (previewGithub === 'https://bit.ly/4xrqAWN') {
    previewGithub = '';
  }

  return [
    previewEmail,
    previewPhone,
    previewLocation,
    previewWebsite,
    previewLinkedin,
    previewGithub
  ].filter(Boolean);
};

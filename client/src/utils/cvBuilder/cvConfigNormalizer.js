export const normalizeCvConfig = (configRes, profileRes, contactRes) => {
  const defaultVariantIds = ['web-developer', 'construction', 'manufacturing', 'general-ats'];
  const defaultLabels = {
    'web-developer': 'Web Developer',
    'construction': 'Konstruksi',
    'manufacturing': 'Manufaktur',
    'general-ats': 'ATS Umum'
  };

  const baseSections = (configRes?.sections && configRes.sections.length > 0)
    ? configRes.sections
    : [
        { id: 'skills', enabled: true, order: 1, selectedIds: [] },
        { id: 'experience', enabled: true, order: 2, selectedIds: [] },
        { id: 'projects', enabled: true, order: 3, selectedIds: [] },
        { id: 'education', enabled: true, order: 4, selectedIds: [] },
        { id: 'credentials', enabled: true, order: 5, selectedIds: [] }
      ];

  const ensuredBaseSections = baseSections.map(s => {
    if (s.id === 'experience' || s.id === 'education') {
      return { ...s, enabled: true };
    }
    return s;
  });

  // Root level github/linkedin cleanup helpers
  const cleanGithub = (val) => (val === 'https://bit.ly/4xrqAWN' ? '' : (val || ''));

  const rawConfigGithub = configRes?.github;
  const rawContactGithub = contactRes?.contact?.github;
  const finalGithub = cleanGithub(rawConfigGithub) || cleanGithub(rawContactGithub) || '';

  // Extract linkedin override
  let initialLinkedin = configRes?.linkedin || '';
  if (!initialLinkedin && (rawConfigGithub === 'https://bit.ly/4xrqAWN' || rawContactGithub === 'https://bit.ly/4xrqAWN')) {
    initialLinkedin = 'https://bit.ly/4xrqAWN';
  }
  if (!initialLinkedin) {
    initialLinkedin = contactRes?.contact?.linkedin || 'https://bit.ly/4xrqAWN';
  }

  const defaultContact = {
    displayName: configRes?.displayName || profileRes?.profile?.name || '',
    phone: configRes?.phone || '0851 6265 4466',
    website: configRes?.website || 'https://syahputran.vercel.app/',
    linkedin: initialLinkedin,
    github: finalGithub,
    email: configRes?.email || contactRes?.contact?.email || '',
    location: configRes?.location || contactRes?.contact?.location || ''
  };

  let activeVariantId = configRes?.activeVariantId || 'web-developer';
  let variants = [];

  if (configRes && configRes.variants && Array.isArray(configRes.variants) && configRes.variants.length > 0) {
    variants = configRes.variants.map(v => {
      let vGithub = v.github;
      let vLinkedin = v.linkedin;
      
      // If github is bitly, move to linkedin if linkedin is empty/missing, then clear github
      if (vGithub === 'https://bit.ly/4xrqAWN') {
        if (!vLinkedin) {
          vLinkedin = 'https://bit.ly/4xrqAWN';
        }
        vGithub = '';
      }
      
      return {
        id: v.id,
        name: v.name || defaultLabels[v.id] || 'CV Variant',
        displayName: v.displayName || defaultContact.displayName,
        professionalTitle: v.professionalTitle || 'Professional Title',
        targetRole: v.targetRole || 'Target Role',
        summary: v.summary || '',
        phone: v.phone || defaultContact.phone,
        website: v.website || defaultContact.website,
        linkedin: vLinkedin || defaultContact.linkedin,
        github: cleanGithub(vGithub) || defaultContact.github,
        email: v.email || defaultContact.email,
        location: v.location || defaultContact.location,
        sections: (v.sections && v.sections.length > 0) ? v.sections.map(s => {
          if (s.id === 'experience' || s.id === 'education') {
            return { ...s, enabled: true };
          }
          return s;
        }) : ensuredBaseSections.map(s => ({ ...s, selectedIds: [] }))
      };
    });
  } else {
    // Migrate existing root config into the web-developer variant
    let mainLinkedin = configRes?.linkedin || '';
    if (!mainLinkedin && configRes?.github === 'https://bit.ly/4xrqAWN') {
      mainLinkedin = 'https://bit.ly/4xrqAWN';
    }
    if (!mainLinkedin) {
      mainLinkedin = defaultContact.linkedin;
    }

    const mainVariant = {
      id: 'web-developer',
      name: 'Web Developer',
      displayName: configRes?.displayName || defaultContact.displayName,
      professionalTitle: configRes?.professionalTitle || profileRes?.profile?.title || 'Full Stack Developer',
      targetRole: configRes?.targetRole || 'Full Stack Developer',
      summary: configRes?.summary || '',
      phone: configRes?.phone || defaultContact.phone,
      website: configRes?.website || defaultContact.website,
      linkedin: mainLinkedin,
      github: finalGithub,
      email: configRes?.email || defaultContact.email,
      location: configRes?.location || defaultContact.location,
      sections: ensuredBaseSections
    };
    
    variants.push(mainVariant);
  }

  // Ensure all 4 default variants are present
  defaultVariantIds.forEach(id => {
    const exists = variants.some(v => v.id === id);
    if (!exists) {
      let defaultTitle = '';
      if (id === 'construction') defaultTitle = 'Construction Staff';
      if (id === 'manufacturing') defaultTitle = 'Manufacturing Operator';
      if (id === 'general-ats') defaultTitle = 'Professional';
      if (id === 'web-developer') defaultTitle = 'Web Developer';

      variants.push({
        id,
        name: defaultLabels[id],
        displayName: defaultContact.displayName,
        professionalTitle: defaultTitle,
        targetRole: defaultTitle,
        summary: '',
        phone: defaultContact.phone,
        website: defaultContact.website,
        linkedin: defaultContact.linkedin,
        github: defaultContact.github,
        email: defaultContact.email,
        location: defaultContact.location,
        sections: ensuredBaseSections.map(s => ({ ...s, selectedIds: [] }))
      });
    }
  });

  if (!defaultVariantIds.includes(activeVariantId)) {
    activeVariantId = 'web-developer';
  }

  return {
    ...configRes,
    activeVariantId,
    variants
  };
};

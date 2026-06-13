export const getActiveVariant = (cvConfig) => {
  if (!cvConfig || !cvConfig.variants || cvConfig.variants.length === 0) return null;
  return cvConfig.variants.find(v => v.id === cvConfig.activeVariantId) || cvConfig.variants[0];
};

export const copyVariantSettings = (variants, activeVariant, targetVariantId) => {
  if (!variants || !activeVariant) return [];
  return variants.map(v => {
    if (v.id === targetVariantId) {
      return {
        ...activeVariant,
        id: v.id,
        name: v.name
      };
    }
    return v;
  });
};

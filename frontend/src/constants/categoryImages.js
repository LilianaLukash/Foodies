import { assetUrl } from '@utils/helpers';

/** Local Figma exports (1x + @2x) when API returns name only. */
const KEYS = [
  'beef',
  'breakfast',
  'desserts',
  'lamb',
  'goat',
  'miscellaneous',
  'pasta',
  'pork',
  'seafood',
  'side',
  'starter',
  'vegetarian',
  'vegan',
  'chicken',
  'soup',
];

const ALIASES = {
  dessert: 'desserts',
};

const resolveKey = (name = '') => {
  const raw = String(name).trim().toLowerCase();
  return ALIASES[raw] || (KEYS.includes(raw) ? raw : '');
};

export const getCategoryImageSources = (category = {}) => {
  const fromApi = category.img || category.thumb;
  if (fromApi) {
    return { src: fromApi, srcSet: undefined };
  }

  const key = resolveKey(category.name);
  if (!key) return { src: '', srcSet: undefined };

  const src = assetUrl(`images/categories/${key}.jpg`);
  const src2x = assetUrl(`images/categories/${key}@2x.jpg`);
  return {
    src,
    srcSet: `${src} 1x, ${src2x} 2x`,
  };
};

export const getCategoryImage = (category = {}) => getCategoryImageSources(category).src;

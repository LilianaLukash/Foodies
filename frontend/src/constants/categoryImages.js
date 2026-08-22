import { assetUrl } from '@utils/helpers';

/** Local Figma exports for category cards (backend currently returns name only). */
const FILES = {
  beef: 'beef.jpg',
  breakfast: 'breakfast.jpg',
  dessert: 'desserts.jpg',
  desserts: 'desserts.jpg',
  lamb: 'lamb.jpg',
  goat: 'goat.jpg',
  miscellaneous: 'miscellaneous.jpg',
  pasta: 'pasta.jpg',
  pork: 'pork.jpg',
  seafood: 'seafood.jpg',
  side: 'side.jpg',
  starter: 'starter.jpg',
  vegetarian: 'vegetarian.jpg',
  vegan: 'vegan.jpg',
  chicken: 'chicken.jpg',
  soup: 'soup.jpg',
};

export const getCategoryImage = (category = {}) => {
  const fromApi = category.img || category.thumb;
  if (fromApi) return fromApi;

  const key = String(category.name || '')
    .trim()
    .toLowerCase();
  const file = FILES[key];
  return file ? assetUrl(`images/categories/${file}`) : '';
};

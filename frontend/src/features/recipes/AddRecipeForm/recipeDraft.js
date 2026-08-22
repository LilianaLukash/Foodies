import { STORAGE_KEYS, STEPPER } from '@constants';
import { storage } from '@utils/storage';
import { initialValues } from './recipeValidation';

const DRAFT_KEYS = [
  'title',
  'description',
  'categoryId',
  'areaId',
  'time',
  'ingredients',
  'instructions',
  'ingredientId',
  'measure',
];

const isPlainObject = (value) => value != null && typeof value === 'object' && !Array.isArray(value);

const sanitizeIngredient = (item) => {
  if (!isPlainObject(item) || typeof item.id !== 'string' || !item.id.trim()) return null;

  return {
    id: item.id,
    name: typeof item.name === 'string' ? item.name : '',
    measure: typeof item.measure === 'string' ? item.measure : '',
    img: typeof item.img === 'string' ? item.img : '',
  };
};

const sanitizeDraft = (draft) => {
  if (!isPlainObject(draft)) return null;

  const time = Number(draft.time);
  const ingredients = Array.isArray(draft.ingredients)
    ? draft.ingredients.map(sanitizeIngredient).filter(Boolean)
    : [];

  return {
    ...initialValues,
    title: typeof draft.title === 'string' ? draft.title : '',
    description: typeof draft.description === 'string' ? draft.description : '',
    categoryId: typeof draft.categoryId === 'string' ? draft.categoryId : '',
    areaId: typeof draft.areaId === 'string' ? draft.areaId : '',
    time: Number.isFinite(time) && time >= STEPPER.MIN ? time : STEPPER.MIN,
    ingredients,
    instructions: typeof draft.instructions === 'string' ? draft.instructions : '',
    ingredientId: typeof draft.ingredientId === 'string' ? draft.ingredientId : '',
    measure: typeof draft.measure === 'string' ? draft.measure : '',
    mainImage: null,
  };
};

export const isMeaningfulRecipeDraft = (values) => {
  if (!isPlainObject(values)) return false;

  return Boolean(
    values.title?.trim() ||
      values.description?.trim() ||
      values.instructions?.trim() ||
      values.categoryId ||
      values.areaId ||
      values.ingredientId ||
      values.measure?.trim() ||
      (Array.isArray(values.ingredients) && values.ingredients.length > 0) ||
      (Number(values.time) !== STEPPER.MIN && Number.isFinite(Number(values.time))),
  );
};

export const toRecipeDraftPayload = (values) => {
  if (!isPlainObject(values)) return null;

  return DRAFT_KEYS.reduce((acc, key) => {
    acc[key] = values[key];
    return acc;
  }, {});
};

export const loadAddRecipeDraft = () => {
  const draft = storage.getJSON(STORAGE_KEYS.ADD_RECIPE_DRAFT);
  return sanitizeDraft(draft);
};

export const saveAddRecipeDraft = (values) => {
  if (!isMeaningfulRecipeDraft(values)) {
    clearAddRecipeDraft();
    return false;
  }

  return storage.setJSON(STORAGE_KEYS.ADD_RECIPE_DRAFT, toRecipeDraftPayload(values));
};

export const clearAddRecipeDraft = () => storage.remove(STORAGE_KEYS.ADD_RECIPE_DRAFT);

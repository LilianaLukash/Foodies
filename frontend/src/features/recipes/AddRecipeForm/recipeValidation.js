import * as Yup from 'yup';
import { getId } from '@utils/helpers';
import { STEPPER } from '@constants';

const TITLE_MAX = 100;
const DESCRIPTION_MAX = 200;
const INSTRUCTIONS_MAX = 1000;

export const RECIPE_LIMITS = {
  TITLE_MAX,
  DESCRIPTION_MAX,
  INSTRUCTIONS_MAX,
};

const formIngredientSchema = Yup.object({
  id: Yup.string().required(),
  name: Yup.string(),
  measure: Yup.string().trim().required('Quantity is required'),
  img: Yup.string().nullable(),
});

export const recipeFormSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(TITLE_MAX, `Max ${TITLE_MAX} characters`)
    .required('Title is required'),
  instructions: Yup.string()
    .trim()
    .max(INSTRUCTIONS_MAX, `Max ${INSTRUCTIONS_MAX} characters`)
    .required('Instructions are required'),
  description: Yup.string()
    .trim()
    .max(DESCRIPTION_MAX, `Max ${DESCRIPTION_MAX} characters`)
    .required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  areaId: Yup.string().required('Area is required'),
  time: Yup.number()
    .transform((value, original) => (original === '' || original == null ? null : value))
    .required('Cooking time is required')
    .integer('Time must be a whole number')
    .min(STEPPER.MIN, `Cooking time must be at least ${STEPPER.MIN} minute`),
  mainImage: Yup.mixed().test(
    'required',
    'Photo is required',
    (value) =>
      value instanceof File || (typeof value === 'string' && Boolean(value.trim())),
  ),
  ingredients: Yup.array()
    .of(formIngredientSchema)
    .min(1, 'Add at least one ingredient'),
});

export const createRecipeSchema = recipeFormSchema;
export const updateRecipeSchema = recipeFormSchema;

export const initialValues = {
  mainImage: null,
  title: '',
  description: '',
  categoryId: '',
  areaId: '',
  time: STEPPER.MIN,
  ingredients: [],
  instructions: '',
  ingredientId: '',
  measure: '',
};

const toFormIngredient = (item) => ({
  id: item.ingredientId ?? item.id ?? getId(item.ingredient) ?? getId(item),
  name: item.name ?? item.ingredient?.name ?? '',
  measure: item.measure ?? '',
  img: item.img ?? item.ingredient?.img ?? '',
});

export const getRecipeInitialValues = (recipe) => {
  if (!recipe) return { ...initialValues };

  const categoryId =
    recipe.categoryId ??
    (typeof recipe.category === 'object' ? getId(recipe.category) : '') ??
    '';
  const areaId =
    recipe.areaId ?? (typeof recipe.area === 'object' ? getId(recipe.area) : '') ?? '';
  const parsedTime = recipe.time != null && recipe.time !== '' ? Number(recipe.time) : null;

  return {
    mainImage: recipe.mainImage || recipe.thumb || null,
    title: recipe.title ?? '',
    description: recipe.description ?? '',
    categoryId,
    areaId,
    time: Number.isFinite(parsedTime) && parsedTime >= STEPPER.MIN ? parsedTime : STEPPER.MIN,
    ingredients: (recipe.ingredients ?? []).map(toFormIngredient),
    instructions: recipe.instructions ?? '',
    ingredientId: '',
    measure: '',
  };
};

export const getRecipeValidationSchema = () => recipeFormSchema;

export const buildRecipeFormData = (values) => {
  const formData = new FormData();

  formData.append('title', values.title.trim());
  formData.append('description', values.description.trim());
  formData.append('instructions', values.instructions.trim());
  formData.append('categoryId', values.categoryId);
  formData.append('areaId', values.areaId);
  formData.append('time', String(values.time));

  const ingredientsPayload = (values.ingredients ?? []).map(({ id, measure }) => ({
    id,
    ...(measure?.trim() ? { measure: measure.trim() } : {}),
  }));
  formData.append('ingredients', JSON.stringify(ingredientsPayload));

  if (values.mainImage instanceof File) {
    formData.append('mainImage', values.mainImage);
  }

  return formData;
};


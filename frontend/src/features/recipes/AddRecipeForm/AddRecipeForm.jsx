import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import toast from 'react-hot-toast';
import Button from '@components/Button/Button';
import Icon from '@components/Icon/Icon';
import { Input, Textarea, Select, Stepper, PhotoUpload, ConfirmModal } from '@components';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { selectUser } from '@redux/auth/slice';
import {
  fetchAreas,
  fetchCategories,
  fetchIngredients,
  selectAreas,
  selectCategories,
  selectIngredients,
} from '@redux/filters/slice';
import { createRecipe, updateRecipe, deleteRecipe } from '@api/services';
import { getErrorMessage, getId } from '@utils/helpers';
import {
  RECIPE_LIMITS,
  buildRecipeFormData,
  getRecipeInitialValues,
  recipeFormSchema,
} from './recipeValidation';
import {
  clearAddRecipeDraft,
  isMeaningfulRecipeDraft,
  loadAddRecipeDraft,
  saveAddRecipeDraft,
} from './recipeDraft';
import css from './AddRecipeForm.module.css';

const SELECT_TABLET_WIDTH = 314;
const AREA_SELECT_TABLET_WIDTH = 330;
const AREA_SELECT_DESKTOP_WIDTH = 344;
const DRAFT_SAVE_DELAY_MS = 400;

const RecipeDraftSync = ({ values, enabled }) => {
  useEffect(() => {
    if (!enabled) return undefined;

    const timerId = window.setTimeout(() => {
      saveAddRecipeDraft(values);
    }, DRAFT_SAVE_DELAY_MS);

    return () => window.clearTimeout(timerId);
  }, [values, enabled]);

  return null;
};

const AddRecipeForm = ({ recipe } = {}) => {
  const isEdit = Boolean(recipe && getId(recipe));
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const resetFormRef = useRef(null);
  const [initialValues] = useState(() => {
    if (isEdit) return getRecipeInitialValues(recipe);
    return loadAddRecipeDraft() ?? getRecipeInitialValues();
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const categories = useAppSelector(selectCategories);
  const areas = useAppSelector(selectAreas);
  const ingredients = useAppSelector(selectIngredients);

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
    if (!areas.length) dispatch(fetchAreas());
    if (!ingredients.length) dispatch(fetchIngredients());
  }, [dispatch, categories.length, areas.length, ingredients.length]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = buildRecipeFormData(values);
      const saved = isEdit
        ? await updateRecipe(getId(recipe), formData)
        : await createRecipe(formData);
      if (!isEdit) clearAddRecipeDraft();
      navigate(`/recipe/${getId(saved) || getId(recipe)}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipe(getId(recipe));
      setIsConfirmModalOpen(false);
      navigate(getId(user) ? `/user/${getId(user)}` : '/');
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleResetForm = () => {
    clearAddRecipeDraft();
    resetFormRef.current?.({ values: getRecipeInitialValues() });
    setIsConfirmModalOpen(false);
  };

  const handleTrashClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleConfirmTrash = () => {
    if (isEdit) {
      handleDeleteRecipe();
      return;
    }
    handleResetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={isEdit}
      validationSchema={recipeFormSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, setFieldError, setFieldTouched, isSubmitting, resetForm }) => {
        resetFormRef.current = resetForm;

        return (
          <Form className={css.form}>
            <RecipeDraftSync values={values} enabled={!isEdit} />
            <div>
              <PhotoUpload name="mainImage" />
              <ErrorMessage name="mainImage" component="p" className={css.error} />
            </div>

            <div className={css.recipe}>
              <div className={css.recipeMainInfo}>
                <Input name="title" placeholder="The name of the recipe" required />

                <Textarea
                  name="description"
                  placeholder="Enter a description of the dish"
                  maxLength={RECIPE_LIMITS.DESCRIPTION_MAX}
                  required
                />
              </div>

              <div className={css.recipeWrapper}>
                <div className={css.row}>
                  <Select
                    name="categoryId"
                    label="Category"
                    options={categories}
                    placeholder="Select a category"
                    required
                    tabletWidth={SELECT_TABLET_WIDTH}
                  />
                  <Stepper name="time" label="Cooking time" required />
                </div>

                <Select
                  name="areaId"
                  label="Area"
                  options={areas}
                  placeholder="Area"
                  required
                  tabletWidth={AREA_SELECT_TABLET_WIDTH}
                  desktopWidth={AREA_SELECT_DESKTOP_WIDTH}
                />

                <div>
                  <div className={css.ingRow}>
                    <Select
                      name="ingredientId"
                      label="Ingredients"
                      options={ingredients}
                      placeholder="Add the ingredient"
                      required
                      tabletWidth={SELECT_TABLET_WIDTH}
                    />
                    <Input
                      name="measure"
                      placeholder="Enter quantity"
                      required
                      rowAlign
                      className={css.ingMeasure}
                    />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className={css.addIng}
                    onClick={() => {
                      let hasError = false;

                      if (!values.ingredientId) {
                        setFieldError('ingredientId', 'Select an ingredient');
                        setFieldTouched('ingredientId', true, false);
                        hasError = true;
                      }

                      if (!values.measure?.trim()) {
                        setFieldError('measure', 'Quantity is required');
                        setFieldTouched('measure', true, false);
                        hasError = true;
                      }

                      if (hasError) return;

                      const found = ingredients.find((item) => getId(item) === values.ingredientId);
                      if (!found) return;

                      if (values.ingredients.some((item) => item.id === getId(found))) {
                        setFieldError('ingredientId', 'Ingredient already added');
                        setFieldTouched('ingredientId', true, false);
                        return;
                      }

                      setFieldValue('ingredients', [
                        ...values.ingredients,
                        {
                          id: getId(found),
                          name: found.name,
                          measure: values.measure.trim(),
                          img: found.img || '',
                        },
                      ]);
                      setFieldValue('ingredientId', '');
                      setFieldValue('measure', '');
                      setFieldError('ingredientId', undefined);
                      setFieldError('measure', undefined);
                      setFieldTouched('ingredientId', false, false);
                      setFieldTouched('measure', false, false);
                    }}
                  >
                    Add ingredient +
                  </Button>
                  <ErrorMessage name="ingredients" component="p" className={css.error} />

                  {!!values.ingredients.length && (
                    <ul className={css.chips}>
                      {values.ingredients.map((item) => (
                        <li key={item.id} className={css.chip}>
                          <div className={css.chipImage}>
                            {item.img ? <img src={item.img} alt={item.name} /> : null}
                          </div>
                          <div className={css.chipBody}>
                            <p className={css.chipName}>{item.name}</p>
                            {item.measure ? <p className={css.chipMeasure}>{item.measure}</p> : null}
                            <button
                              type="button"
                              className={css.chipRemove}
                              aria-label={`Remove ${item.name}`}
                              onClick={() =>
                                setFieldValue(
                                  'ingredients',
                                  values.ingredients.filter((ing) => ing.id !== item.id),
                                )
                              }
                            >
                              <Icon name="icon-close" size={16} sizeTablet={16} />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <Textarea
                name="instructions"
                label="Recipe preparation"
                placeholder="Enter recipe"
                maxLength={RECIPE_LIMITS.INSTRUCTIONS_MAX}
                required
              />

              <div className={css.actions}>
                <Button
                  type="button"
                  variant="outline"
                  className={css.trash}
                  aria-label={isEdit ? 'Delete recipe' : 'Reset form'}
                  disabled={!isEdit && !isMeaningfulRecipeDraft(values)}
                  onClick={handleTrashClick}
                >
                  <Icon name="icon-trash" size={20} sizeTablet={20} />
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Publish
                </Button>
              </div>
            </div>
            {isConfirmModalOpen ? (
              <ConfirmModal
                text={
                  isEdit
                    ? 'Are you sure you want to delete this recipe?'
                    : 'Are you sure you want to clear the form?'
                }
                onConfirm={handleConfirmTrash}
                onCancel={() => setIsConfirmModalOpen(false)}
              />
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddRecipeForm;

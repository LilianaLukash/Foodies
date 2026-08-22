import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import SelectField from '../SelectField/SelectField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchAreas,
  fetchCategories,
  fetchIngredients,
  selectAreas,
  selectCategories,
  selectIngredients,
} from '../../redux/filters/slice';
import { createRecipe } from '../../api/services';
import { getErrorMessage, getId } from '../../utils/helpers';
import css from './AddRecipeForm.module.css';

const schema = Yup.object({
  mainImage: Yup.mixed().required('Photo is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().max(200, 'Max 200 characters').required('Description is required'),
  categoryId: Yup.string().required('Category is required'),
  areaId: Yup.string().required('Area is required'),
  time: Yup.number().min(1, 'At least 1 minute').required('Time is required'),
  ingredients: Yup.array().min(1, 'Add at least one ingredient').required(),
  instructions: Yup.string().max(1000, 'Max 1000 characters').required('Instructions are required'),
});

const initialValues = {
  mainImage: null,
  title: '',
  description: '',
  categoryId: '',
  areaId: '',
  time: 10,
  ingredients: [],
  instructions: '',
};

const AddRecipeForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const areas = useAppSelector(selectAreas);
  const ingredients = useAppSelector(selectIngredients);
  const [ingredientId, setIngredientId] = useState('');
  const [measure, setMeasure] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
    if (!areas.length) dispatch(fetchAreas());
    if (!ingredients.length) dispatch(fetchIngredients());
  }, [dispatch, categories.length, areas.length, ingredients.length]);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const formData = new FormData();
          formData.append('title', values.title);
          formData.append('description', values.description);
          formData.append('categoryId', values.categoryId);
          formData.append('areaId', values.areaId);
          formData.append('time', String(values.time));
          formData.append('instructions', values.instructions);
          formData.append(
            'ingredients',
            JSON.stringify(values.ingredients.map(({ id, measure }) => ({ id, measure }))),
          );
          formData.append('mainImage', values.mainImage);
          const created = await createRecipe(formData);
          navigate(`/recipe/${getId(created)}`);
        } catch (error) {
          toast.error(getErrorMessage(error));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, setFieldValue, isSubmitting, resetForm }) => (
        <Form className={css.form}>
          <label className={css.upload}>
            {preview ? (
              <img src={preview} alt="Recipe preview" />
            ) : (
              <span>Upload a photo</span>
            )}
            <input
              className="visually-hidden"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (!file) return;
                if (preview) URL.revokeObjectURL(preview);
                setPreview(URL.createObjectURL(file));
                setFieldValue('mainImage', file);
              }}
            />
            {errors.mainImage && touched.mainImage ? (
              <p className={css.error}>{errors.mainImage}</p>
            ) : null}
          </label>

          <div className={css.fields}>
            <label className={css.input}>
              <Field name="title" placeholder="The name of the recipe" />
              <ErrorMessage className={css.error} name="title" component="p" />
            </label>

            <label className={css.input}>
              <Field as="textarea" name="description" maxLength={200} placeholder="Description" />
              <span className={css.counter}>{values.description.length}/200</span>
              <ErrorMessage className={css.error} name="description" component="p" />
            </label>

            <div className={css.row}>
              <SelectField
                options={categories}
                value={values.categoryId}
                onChange={(value) => setFieldValue('categoryId', value)}
                placeholder="Category"
                error={touched.categoryId ? errors.categoryId : ''}
              />
              <div className={css.time}>
                <p>Cooking time</p>
                <div>
                  <button
                    type="button"
                    aria-label="Decrease time"
                    onClick={() => setFieldValue('time', Math.max(1, values.time - 1))}
                  >
                    <Icon name="icon-minus" size={16} />
                  </button>
                  <span>{values.time} min</span>
                  <button
                    type="button"
                    aria-label="Increase time"
                    onClick={() => setFieldValue('time', values.time + 1)}
                  >
                    <Icon name="icon-plus" size={16} />
                  </button>
                </div>
                <ErrorMessage className={css.error} name="time" component="p" />
              </div>
            </div>

            <SelectField
              options={areas}
              value={values.areaId}
              onChange={(value) => setFieldValue('areaId', value)}
              placeholder="Area"
              error={touched.areaId ? errors.areaId : ''}
            />

            <div className={css.ingRow}>
              <SelectField
                options={ingredients}
                value={ingredientId}
                onChange={setIngredientId}
                placeholder="Ingredient"
              />
              <input
                value={measure}
                onChange={(event) => setMeasure(event.target.value)}
                placeholder="Quantity"
              />
            </div>
            <button
              className={css.addIng}
              type="button"
              onClick={() => {
                const found = ingredients.find((item) => getId(item) === ingredientId);
                if (!found || !measure.trim()) {
                  toast.error('Select an ingredient and quantity');
                  return;
                }
                if (values.ingredients.some((item) => getId(item) === getId(found))) {
                  toast.error('Ingredient already added');
                  return;
                }
                setFieldValue('ingredients', [
                  ...values.ingredients,
                  { id: getId(found), name: found.name, measure, img: found.img || found.thumb },
                ]);
                setIngredientId('');
                setMeasure('');
              }}
            >
              Add ingredient +
            </button>
            {errors.ingredients && touched.ingredients ? (
              <p className={css.error}>{errors.ingredients}</p>
            ) : null}

            <ul className={css.chips}>
              {values.ingredients.map((item) => (
                <li key={item.id}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>{item.measure}</span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() =>
                      setFieldValue(
                        'ingredients',
                        values.ingredients.filter((ing) => ing.id !== item.id),
                      )
                    }
                  >
                    <Icon name="icon-close" size={16} />
                  </button>
                </li>
              ))}
            </ul>

            <label className={css.input}>
              <Field as="textarea" name="instructions" maxLength={1000} placeholder="Recipe preparation*" rows={6} />
              <span className={css.counter}>{values.instructions.length}/1000</span>
              <ErrorMessage className={css.error} name="instructions" component="p" />
            </label>

            <div className={css.actions}>
              <button
                className={css.trash}
                type="button"
                aria-label="Reset form"
                onClick={() => {
                  if (preview) URL.revokeObjectURL(preview);
                  setPreview('');
                  setIngredientId('');
                  setMeasure('');
                  resetForm();
                }}
              >
                <Icon name="icon-trash" size={20} />
              </button>
              <Button type="submit" disabled={isSubmitting}>
                Publish
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddRecipeForm;

import { useEffect } from 'react';
import SelectField from '../SelectField/SelectField';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchAreas, fetchIngredients, selectAreas, selectIngredients } from '../../redux/filters/slice';
import css from './RecipeFilters.module.css';

const RecipeFilters = ({ ingredient, area, onChange }) => {
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(selectIngredients);
  const areas = useAppSelector(selectAreas);

  useEffect(() => {
    if (!ingredients.length) dispatch(fetchIngredients());
    if (!areas.length) dispatch(fetchAreas());
  }, [dispatch, ingredients.length, areas.length]);

  return (
    <div className={css.wrap}>
      <SelectField
        options={ingredients}
        value={ingredient}
        onChange={(value) => onChange({ ingredient: value, area })}
        placeholder="Ingredients"
      />
      <SelectField
        options={areas}
        value={area}
        onChange={(value) => onChange({ ingredient, area: value })}
        placeholder="Area"
        getOptionValue={(option) => option.name}
      />
    </div>
  );
};

export default RecipeFilters;

import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';

const RecipeInfo = ({ recipe, onFavoriteChange }) => (
  <RecipeMainInfo recipe={recipe}>
    <RecipeIngredients ingredients={recipe.ingredients || []} />
    <RecipePreparation recipe={recipe} onFavoriteChange={onFavoriteChange} />
  </RecipeMainInfo>
);

export default RecipeInfo;

import RecipeMainInfo from '../RecipeMainInfo/RecipeMainInfo';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients';
import RecipePreparation from '../RecipePreparation/RecipePreparation';

const RecipeInfo = ({ recipe }) => (
  <RecipeMainInfo recipe={recipe}>
    <RecipeIngredients ingredients={recipe.ingredients || []} />
    <RecipePreparation recipe={recipe} />
  </RecipeMainInfo>
);

export default RecipeInfo;

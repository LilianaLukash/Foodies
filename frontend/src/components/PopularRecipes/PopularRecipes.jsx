import RecipeCard from '../RecipeCard/RecipeCard';
import MainTitle from '../MainTitle/MainTitle';
import css from './PopularRecipes.module.css';

const PopularRecipes = ({ recipes = [], onFavoriteChange }) => (
  <section className={css.section}>
    <h2 className={css.title}>Popular recipes</h2>
    <ul className={css.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id || recipe._id}>
          <RecipeCard recipe={recipe} onFavoriteChange={onFavoriteChange} />
        </li>
      ))}
    </ul>
  </section>
);

export default PopularRecipes;

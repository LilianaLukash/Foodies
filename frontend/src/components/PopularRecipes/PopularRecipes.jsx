import RecipeCard from '../RecipeCard/RecipeCard';
import MainTitle from '../MainTitle/MainTitle';
import css from './PopularRecipes.module.css';

const PopularRecipes = ({ recipes = [] }) => (
  <section className={css.section}>
    <MainTitle>Popular recipes</MainTitle>
    <ul className={css.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id || recipe._id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  </section>
);

export default PopularRecipes;

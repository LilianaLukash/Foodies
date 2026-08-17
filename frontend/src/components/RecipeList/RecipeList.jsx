import clsx from 'clsx';
import RecipeCard from '../RecipeCard/RecipeCard';
import css from './RecipeList.module.css';

const RecipeList = ({ recipes, onFavoriteChange, variant = 'grid' }) => {
  if (!recipes.length) {
    return <p className={css.empty}>No recipes found. Try another filter.</p>;
  }

  return (
    <ul className={clsx(css.list, variant === 'feed' && css.feed)}>
      {recipes.map((recipe) => (
        <li key={recipe.id || recipe._id}>
          <RecipeCard recipe={recipe} onFavoriteChange={onFavoriteChange} />
        </li>
      ))}
    </ul>
  );
};

export default RecipeList;

import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { getId, recipeImage } from '../../utils/helpers';
import css from './RecipePreview.module.css';

const RecipePreview = ({ recipe, onDelete, deleteLabel = 'Delete recipe' }) => {
  const id = getId(recipe);

  return (
    <article className={css.card}>
      <img src={recipeImage(recipe)} alt={recipe.title} />
      <div className={css.content}>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
      </div>
      <div className={css.actions}>
        <Link to={`/recipe/${id}`} aria-label="Open recipe">
          <Icon name="icon-arrow-up-right" size={18} />
        </Link>
        {onDelete ? (
          <button type="button" aria-label={deleteLabel} onClick={() => onDelete(id)}>
            <Icon name="icon-trash" size={18} />
          </button>
        ) : null}
      </div>
    </article>
  );
};

export default RecipePreview;

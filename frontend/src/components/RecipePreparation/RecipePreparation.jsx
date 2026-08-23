import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import { addFavorite, removeFavorite } from '../../api/services';
import { getErrorMessage, getId, isRecipeOwner } from '../../utils/helpers';
import buttonCss from '../Button/Button.module.css';
import css from './RecipePreparation.module.css';

const RecipePreparation = ({ recipe, onFavoriteChange }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [favorite, setFavorite] = useState(Boolean(recipe.isFavorite));
  const [pending, setPending] = useState(false);
  const id = getId(recipe);
  const canEdit = isRecipeOwner(recipe, user);

  useEffect(() => setFavorite(Boolean(recipe.isFavorite)), [recipe.isFavorite]);

  const onToggle = async () => {
    if (!isLoggedIn) {
      dispatch(openModal('signIn'));
      return;
    }
    setPending(true);
    try {
      if (favorite) await removeFavorite(id);
      else await addFavorite(id);
      setFavorite(!favorite);
      onFavoriteChange?.(id, !favorite);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <section className={css.section}>
      <h3 className={css.title}>Recipe preparation</h3>
      <p className={css.text}>{recipe.instructions}</p>
      <div className={css.actions}>
        {canEdit ? (
          <Link
            to={`/recipe/${id}/edit`}
            className={clsx(buttonCss.button, buttonCss.outline)}
          >
            Edit recipe
          </Link>
        ) : null}
        <Button variant="outline" disabled={pending} onClick={onToggle}>
          {favorite ? 'Remove from favorites' : 'Add to favorites'}
        </Button>
      </div>
    </section>
  );
};

export default RecipePreparation;

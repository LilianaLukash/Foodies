import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import { addFavorite, removeFavorite } from '../../api/services';
import { getErrorMessage, getId } from '../../utils/helpers';
import css from './RecipePreparation.module.css';

const RecipePreparation = ({ recipe }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [favorite, setFavorite] = useState(Boolean(recipe.isFavorite));
  const [pending, setPending] = useState(false);
  const id = getId(recipe);

  const onToggle = async () => {
    if (!isLoggedIn) {
      dispatch(openModal('signIn'));
      return;
    }
    setPending(true);
    try {
      if (favorite) await removeFavorite(id);
      else await addFavorite(id);
      setFavorite((prev) => !prev);
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
      <Button variant="outline" disabled={pending} onClick={onToggle}>
        {favorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    </section>
  );
};

export default RecipePreparation;

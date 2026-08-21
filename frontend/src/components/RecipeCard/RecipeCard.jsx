import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Icon from '../Icon/Icon';
import Avatar from '../Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn, selectUser } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import { addFavorite, removeFavorite } from '../../api/services';
import { getErrorMessage, getId, recipeImage } from '../../utils/helpers';
import css from './RecipeCard.module.css';
import { useEffect, useState } from 'react';

const RecipeCard = ({ recipe, onFavoriteChange }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = getId(recipe);
  const owner = recipe.owner || recipe.user || {};
  const ownerId = getId(owner);
  const [favorite, setFavorite] = useState(Boolean(recipe.isFavorite));
  const [pending, setPending] = useState(false);

  // the same recipe can be toggled elsewhere on the page
  useEffect(() => setFavorite(Boolean(recipe.isFavorite)), [recipe.isFavorite]);

  const requireAuth = () => {
    if (isLoggedIn) return true;
    dispatch(openModal('signIn'));
    return false;
  };

  const onOwner = () => {
    if (!requireAuth()) return;
    navigate(`/user/${ownerId || getId(user)}`);
  };

  const onFavorite = async () => {
    if (!requireAuth()) return;
    setPending(true);
    try {
      if (favorite) await removeFavorite(id);
      else await addFavorite(id);
      setFavorite((prev) => !prev);
      onFavoriteChange?.(id, !favorite);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setPending(false);
    }
  };

  return (
    <article className={css.card}>
      <img
        className={css.image}
        src={recipeImage(recipe)}
        alt={recipe.title}
        loading="lazy"
      />
      <h3 className={css.title}>{recipe.title}</h3>
      <p className={css.description}>{recipe.description}</p>
      <div className={css.footer}>
        <button className={css.owner} type="button" onClick={onOwner}>
          <Avatar src={owner.avatar} alt={owner.name} size={40} />
          <span>{owner.name}</span>
        </button>
        <div className={css.actions}>
          <button
            className={`${css.round} ${favorite ? css.loved : ''}`}
            type="button"
            aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            disabled={pending}
            onClick={onFavorite}
          >
            <Icon name={favorite ? 'icon-heart-filled' : 'icon-heart'} size={18} />
          </button>
          <button
            className={css.round}
            type="button"
            aria-label="Open recipe"
            onClick={() => navigate(`/recipe/${id}`)}
          >
            <Icon name="icon-arrow-up-right" size={18} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeCard;

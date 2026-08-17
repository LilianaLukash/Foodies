import { useNavigate } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import { getId } from '../../utils/helpers';
import css from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe, children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const owner = recipe.owner || {};

  const onOwner = () => {
    if (!isLoggedIn) {
      dispatch(openModal('signIn'));
      return;
    }
    navigate(`/user/${getId(owner)}`);
  };

  return (
    <div className={css.wrap}>
      <img
        className={css.image}
        src={recipe.thumb || recipe.preview}
        alt={recipe.title}
      />
      <div className={css.content}>
        <h2 className={css.title}>{recipe.title}</h2>
        <div className={css.meta}>
          <span>{recipe.category}</span>
          <span>{recipe.time} min</span>
        </div>
        <p className={css.description}>{recipe.description}</p>
        <button className={css.owner} type="button" onClick={onOwner}>
          <Avatar src={owner.avatar} alt={owner.name} size={50} />
          <span>
            <small>Created by:</small>
            {owner.name}
          </span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default RecipeMainInfo;

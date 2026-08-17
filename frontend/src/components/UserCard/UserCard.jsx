import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import { getId } from '../../utils/helpers';
import css from './UserCard.module.css';

const UserCard = ({ user, onFollow, showUnfollowOnly = false }) => {
  const id = getId(user);
  const following = Boolean(user.isFollowing);

  return (
    <article className={css.card}>
      <Avatar src={user.avatar} alt={user.name} size={60} />
      <div>
        <h3>{user.name}</h3>
        <p>Own recipes: {user.recipesCount}</p>
        {!showUnfollowOnly || following ? (
          <button className={css.follow} type="button" onClick={() => onFollow(user, following)}>
            {following ? 'Unfollow' : 'Follow'}
          </button>
        ) : null}
      </div>
      <div className={css.recipes}>
        {(user.recipes || []).slice(0, 4).map((recipe) => (
          <img key={getId(recipe)} src={recipe.thumb} alt={recipe.title} />
        ))}
      </div>
      <Link className={css.arrow} to={`/user/${id}`} aria-label={`Open ${user.name} profile`}>
        <Icon name="icon-arrow-up-right" size={18} />
      </Link>
    </article>
  );
};

export default UserCard;

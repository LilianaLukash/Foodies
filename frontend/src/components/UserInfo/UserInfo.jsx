import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import css from './UserInfo.module.css';

const UserInfo = ({ user, isOwn, onAvatarChange }) => {
  if (!user) return null;

  return (
    <div className={css.card}>
      <div className={css.avatarWrap}>
        <Avatar src={user.avatar} alt={user.name} size={120} />
        {isOwn ? (
          <label className={css.camera}>
            <Icon name="icon-camera" size={16} />
            <input
              className="visually-hidden"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) onAvatarChange(file);
                event.currentTarget.value = '';
              }}
            />
          </label>
        ) : null}
      </div>
      <h3 className={css.name}>{user.name}</h3>
      <ul className={css.stats}>
        <li>
          <span>Email:</span> {user.email}
        </li>
        <li>
          <span>Added recipes:</span> {user.recipesCount}
        </li>
        {isOwn ? (
          <li>
            <span>Favorites:</span> {user.favoritesCount}
          </li>
        ) : null}
        <li>
          <span>Followers:</span> {user.followersCount}
        </li>
        {isOwn ? (
          <li>
            <span>Following:</span> {user.followingCount}
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default UserInfo;

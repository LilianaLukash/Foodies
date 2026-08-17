import { DEFAULT_AVATAR } from '../../utils/helpers';
import css from './Avatar.module.css';

const Avatar = ({ src, alt = 'User avatar', size = 50 }) => (
  <img
    className={css.avatar}
    src={src || DEFAULT_AVATAR}
    alt={alt}
    width={size}
    height={size}
    style={{ width: size, height: size }}
    onError={(event) => {
      event.currentTarget.src = DEFAULT_AVATAR;
    }}
  />
);

export default Avatar;

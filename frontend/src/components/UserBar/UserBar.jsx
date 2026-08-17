import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import Icon from '../Icon/Icon';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import { getId } from '../../utils/helpers';
import css from './UserBar.module.css';

const UserBar = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  if (!user) return null;

  return (
    <div className={css.wrap} ref={wrapRef}>
      <button className={css.trigger} type="button" onClick={() => setOpen((prev) => !prev)}>
        <Avatar src={user.avatar} alt={user.name} size={50} />
        <span className={css.name}>{user.name}</span>
        <Icon name="icon-chevron-down" size={18} />
      </button>
      {open ? (
        <ul className={css.menu}>
          <li>
            <Link to={`/user/${getId(user)}`} onClick={() => setOpen(false)}>
              Profile
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                dispatch(openModal('logOut'));
              }}
            >
              Log out
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default UserBar;

import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import { openModal } from '../../redux/modals/slice';
import css from './Nav.module.css';

const Nav = ({ onNavigate, onDark = false, inDrawer = false }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const onAddRecipeClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      dispatch(openModal('signIn'));
      return;
    }
    onNavigate?.();
  };

  return (
    <nav>
      <ul className={clsx(css.list, onDark && css.onDark, inDrawer && css.drawerList)}>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/"
            end
            onClick={onNavigate}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx(css.link, isActive && css.active)}
            to="/recipe/add"
            onClick={onAddRecipeClick}
          >
            Add recipe
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

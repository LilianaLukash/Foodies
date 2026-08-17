import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Nav.module.css';

const Nav = ({ onNavigate, onDark = false, inDrawer = false }) => (
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
          onClick={onNavigate}
        >
          Add recipe
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Nav;

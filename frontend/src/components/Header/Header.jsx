import { useEffect, useState } from 'react';
import clsx from 'clsx';
import Logo from '../Logo/Logo';
import Nav from '../Nav/Nav';
import AuthBar from '../AuthBar/AuthBar';
import UserBar from '../UserBar/UserBar';
import Icon from '../Icon/Icon';
import { useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/auth/slice';
import css from './Header.module.css';

const Header = ({ embedded = false }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={clsx(css.header, embedded && css.embedded)}>
      <div className={clsx(!embedded && 'container', css.inner)}>
        <Logo onClick={() => setMenuOpen(false)} />
        {isLoggedIn ? (
          <div className={css.desktopNav}>
            <Nav onDark={embedded} />
          </div>
        ) : null}
        <div className={css.right}>
          {isLoggedIn ? <UserBar /> : <AuthBar />}
          {isLoggedIn ? (
            <button
              className={css.burger}
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="icon-menu" size={28} />
            </button>
          ) : null}
        </div>
      </div>

      {menuOpen ? (
        <div className={css.drawer} role="dialog" aria-modal="true">
          <div className={css.drawerHead}>
            <Logo onClick={() => setMenuOpen(false)} />
            <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
              <Icon name="icon-close" size={28} />
            </button>
          </div>
          <Nav inDrawer onNavigate={() => setMenuOpen(false)} />
          <div className={css.drawerArt} aria-hidden="true">
            <img src="/images/hero/dish-small-1x.jpg" alt="" />
            <img src="/images/hero/dish-large-1x.jpg" alt="" />
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;

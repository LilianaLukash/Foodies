import { Link } from 'react-router-dom';
import css from './Logo.module.css';

const Logo = ({ onClick }) => (
  <Link className={css.logo} to="/" onClick={onClick}>
    foodies
  </Link>
);

export default Logo;

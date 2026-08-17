import { Link } from 'react-router-dom';
import css from './PathInfo.module.css';

const PathInfo = ({ page }) => (
  <nav className={css.nav} aria-label="Breadcrumb">
    <Link className={css.home} to="/">
      Home
    </Link>
    <span className={css.sep}>/</span>
    <span className={css.current}>{page}</span>
  </nav>
);

export default PathInfo;

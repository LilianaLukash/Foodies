import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './PathInfo.module.css';

const PathInfo = ({ page, className }) => (
  <nav className={clsx(css.nav, className)} aria-label="Breadcrumb">
    <Link className={css.home} to="/">
      Home
    </Link>
    <span className={css.sep}>/</span>
    <span className={css.current}>{page}</span>
  </nav>
);

export default PathInfo;

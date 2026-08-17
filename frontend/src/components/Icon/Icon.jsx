import clsx from 'clsx';
import css from './Icon.module.css';

const Icon = ({ name, className, size = 24, width, height }) => (
  <svg
    className={clsx(css.icon, className)}
    width={width || size}
    height={height || size}
    aria-hidden="true"
  >
    <use href={`/icons/sprite.svg#${name}`} />
  </svg>
);

export default Icon;

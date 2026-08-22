import clsx from 'clsx';
import css from './Icon.module.css';

const Icon = ({
  name,
  className,
  size = 24,
  sizeTablet = 24,
  width,
  height,
}) => (
  <svg
    className={clsx(css.icon, css.responsive, className)}
    width={width ?? size}
    height={height ?? size}
    style={{
      '--icon-size-mobile': `${size}px`,
      '--icon-size-tablet': `${sizeTablet}px`,
    }}
    aria-hidden="true"
  >
    <use href={`${import.meta.env.BASE_URL}icons/sprite.svg#${name}`} />
  </svg>
);

export default Icon;

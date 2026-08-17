import clsx from 'clsx';
import css from './Button.module.css';

const Button = ({
  children,
  type = 'button',
  variant = 'dark',
  className,
  ...props
}) => (
  <button type={type} className={clsx(css.button, css[variant], className)} {...props}>
    {children}
  </button>
);

export default Button;

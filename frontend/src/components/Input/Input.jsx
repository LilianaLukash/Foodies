import clsx from 'clsx';
import { useField } from 'formik';
import css from './Input.module.css';

export const INPUT_TYPE = {
  text: 'text',
  number: 'number',
  email: 'email',
  password: 'password'
};

const BaseInput = ({
  label,
  placeholder,
  value,
  error,
  name,
  onChange,
  onBlur,
  className,
  type = INPUT_TYPE.text,
  required = false,
  rowAlign = false,
  id = name,
  ...rest
}) => {
  const isEmpty = !String(value ?? '').length;
  const showPlaceholder = isEmpty && Boolean(placeholder);

  return (
    <div className={clsx(css.root, error && css.hasError, rowAlign && css.rowAlign, className)}>
      {label ? (
        <label className={css.label} htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className={css.wrap}>
        {showPlaceholder ? (
          <span className={css.placeholder} aria-hidden="true">
            {placeholder}
            {required ? <span className={css.required}>*</span> : null}
          </span>
        ) : null}
        <input
          className={css.control}
          id={id}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(error)}
          aria-required={required}
          aria-label={label || placeholder}
          {...rest}
        />
      </div>
    </div>
  );
};

const FormikInput = ({ name, error, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <BaseInput
      {...props}
      {...field}
      name={name}
      error={error ?? (meta.touched ? meta.error : '')}
    />
  );
};

const Input = ({ name, value, onChange, ...props }) => {
  if (name != null && value === undefined && onChange === undefined) {
    return <FormikInput name={name} {...props} />;
  }
  return <BaseInput name={name} value={value} onChange={onChange} {...props} />;
};

export default Input;

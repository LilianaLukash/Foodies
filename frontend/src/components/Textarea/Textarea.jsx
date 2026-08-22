import { useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';
import { useField } from 'formik';
import css from './Textarea.module.css';

const Counter = ({ value, maxLength }) => (
  <span className={css.counter}>
    {String(value).length}/{maxLength}
  </span>
);

const BaseTextarea = ({
  label,
  error,
  required = false,
  name,
  id = name,
  value = '',
  onChange,
  onBlur,
  placeholder,
  maxLength,
  rows = 1,
  className,
  ...rest
}) => {
  const ref = useRef(null);
  const isEmpty = !String(value).length;
  const showPlaceholder = isEmpty && Boolean(placeholder);
  const hasCounter = maxLength != null;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <div className={clsx(css.root, error && css.hasError, className)}>
      {label ? (
        <label className={css.label} htmlFor={id}>
          {label}
          {required ? (
            <span className={css.required} aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className={css.wrap}>
        {showPlaceholder ? (
          <span className={css.placeholder} aria-hidden="true">
            <span className={css.placeholderText}>
              {placeholder}
              {required && !label ? <span className={css.required}>*</span> : null}
            </span>
            {hasCounter ? <Counter value={value} maxLength={maxLength} /> : null}
          </span>
        ) : null}
        <textarea
          ref={ref}
          className={clsx(css.control, hasCounter && !isEmpty && css.controlWithCounter)}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          maxLength={maxLength}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-required={required}
          aria-label={label || placeholder}
          {...rest}
        />
        {!isEmpty && hasCounter ? <Counter value={value} maxLength={maxLength} /> : null}
      </div>
    </div>
  );
};

const FormikTextarea = ({ name, error, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <BaseTextarea
      {...props}
      {...field}
      name={name}
      error={error ?? (meta.touched ? meta.error : '')}
    />
  );
};

const Textarea = ({ name, value, onChange, ...props }) => {
  if (name != null && value === undefined && onChange === undefined) {
    return <FormikTextarea name={name} {...props} />;
  }
  return <BaseTextarea name={name} value={value} onChange={onChange} {...props} />;
};

export default Textarea;

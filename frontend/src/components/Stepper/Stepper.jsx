import { useId } from 'react';
import clsx from 'clsx';
import { useField } from 'formik';
import Icon from '@components/Icon/Icon';
import { STEPPER } from '@constants';
import { formatCookingTime } from '@utils/formatCookingTime';
import css from './Stepper.module.css';

const BaseStepper = ({
  label,
  error,
  required = false,
  name,
  id,
  value,
  onChange,
  onBlur,
  min = STEPPER.MIN,
  max,
  fineUntil = STEPPER.FINE_UNTIL,
  fineStep = STEPPER.FINE_STEP,
  step = STEPPER.STEP,
  emptyLabel = STEPPER.EMPTY_LABEL,
  className,
}) => {
  const autoId = useId();
  const fieldId = id ?? name ?? autoId;

  const numeric = value == null || value === '' ? null : Number(value);
  const hasValue = numeric != null && !Number.isNaN(numeric);
  const current = hasValue ? numeric : min;
  const display = formatCookingTime(hasValue ? numeric : min, emptyLabel);

  const commit = (next) => {
    const clampedMax = max != null ? Math.min(max, next) : next;
    onChange?.(Math.max(min, clampedMax));
  };

  const nextValue = () =>
    current < fineUntil ? current + fineStep : current + step;

  const prevValue = () => {
    if (current <= fineUntil) return current - fineStep;
    const candidate = current - step;
    return candidate < fineUntil ? fineUntil : candidate;
  };

  const decrease = () => commit(prevValue());
  const increase = () => commit(nextValue());

  const atMin = current <= min;
  const atMax = max != null && current >= max;

  return (
    <div className={clsx(css.root, error && css.hasError, className)}>
      {label ? (
        <span className={css.label} id={`${fieldId}-label`}>
          {label}
          {required ? (
            <span className={css.required} aria-hidden="true">
              *
            </span>
          ) : null}
        </span>
      ) : null}

      <div
        className={css.controls}
        role="group"
        aria-labelledby={label ? `${fieldId}-label` : undefined}
      >
        <button
          type="button"
          className={css.button}
          aria-label="Decrease time"
          disabled={atMin}
          onClick={decrease}
          onBlur={onBlur}
        >
          <Icon name="icon-minus" size={16} sizeTablet={24} />
        </button>

        <span className={css.value} id={fieldId} aria-live="polite">
          {display}
        </span>

        <button
          type="button"
          className={css.button}
          aria-label="Increase time"
          disabled={atMax}
          onClick={increase}
          onBlur={onBlur}
        >
          <Icon name="icon-plus" size={16} sizeTablet={24} />
        </button>
      </div>

      {error ? (
        <p className={css.error} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

const FormikStepper = ({ name, error, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <BaseStepper
      {...props}
      name={name}
      value={field.value}
      onChange={(next) => {
        helpers.setValue(next);
        helpers.setTouched(true);
      }}
      onBlur={() => helpers.setTouched(true)}
      error={error ?? (meta.touched ? meta.error : '')}
    />
  );
};

const Stepper = ({ name, value, onChange, ...props }) => {
  if (name != null && value === undefined && onChange === undefined) {
    return <FormikStepper name={name} {...props} />;
  }
  return <BaseStepper name={name} value={value} onChange={onChange} {...props} />;
};

export default Stepper;

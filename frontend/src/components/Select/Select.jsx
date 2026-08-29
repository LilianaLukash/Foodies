import { useEffect, useState } from 'react';
import clsx from 'clsx';
import SelectLib from 'react-select';
import { useField } from 'formik';
import css from './Select.module.css';

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 'unset',
    height: 'auto',
    boxShadow: 'none',
    outline: 'none',
    borderColor: state.isFocused ? 'var(--color-black)' : base.borderColor,
    transition: 'border-color var(--transition)',
    '&:hover': {
      borderColor: state.isFocused ? 'var(--color-black)' : base.borderColor,
    },
  }),
  valueContainer: (base) => ({
    ...base,
    display: 'grid',
    padding: 0,
    margin: 0,
    minHeight: 'unset',
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    outline: 'none',
    boxShadow: 'none',
    gridArea: '1 / 1',
  }),
  singleValue: (base) => ({
    ...base,
    margin: 0,
    gridArea: '1 / 1',
  }),
  placeholder: (base) => ({
    ...base,
    margin: 0,
    gridArea: '1 / 1',
  }),
  indicatorsContainer: (base) => ({
    ...base,
    height: 'auto',
    alignSelf: 'center',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    padding: 0,
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 0,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (base, state) => ({
    ...base,
    padding: '4px 18px',
    backgroundColor: state.isFocused ? 'var(--color-gray-light)' : 'transparent',
    color: 'var(--color-black)',
    cursor: 'pointer',
    transition: 'background-color var(--transition)',
    ':active': {
      backgroundColor: 'var(--color-gray-light)',
    },
  }),
};

const defaultGetLabel = (option) => option.name;
const defaultGetValue = (option) => option.id ?? option._id ?? option.name;

const BaseSelect = ({
  label,
  error,
  required = false,
  name,
  id = name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder,
  getOptionLabel = defaultGetLabel,
  getOptionValue = defaultGetValue,
  className,
  isClearable = true,
  isSearchable = true,
  tabletWidth,
  desktopWidth,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const selected =
    options.find((option) => getOptionValue(option) === value || option.name === value) || null;

  const hasFixedWidth = tabletWidth != null || desktopWidth != null;
  const rootStyle = hasFixedWidth
    ? {
        ...(tabletWidth != null ? { '--select-tablet-width': `${tabletWidth}px` } : {}),
        ...(desktopWidth != null ? { '--select-desktop-width': `${desktopWidth}px` } : {}),
      }
    : undefined;

  useEffect(() => {
    if (!menuIsOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuIsOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuIsOpen]);

  const closeMenu = () => setMenuIsOpen(false);

  return (
    <div
      className={clsx(
        css.root,
        hasFixedWidth && css.hasFixedWidth,
        error && css.hasError,
        menuIsOpen && css.isOpen,
        className,
      )}
      style={rootStyle}
    >
      {menuIsOpen ? (
        <div className={css.backdrop} aria-hidden="true" onPointerDown={closeMenu} />
      ) : null}
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
      <SelectLib
        inputId={id}
        name={name}
        classNamePrefix="foodies"
        className={css.select}
        styles={selectStyles}
        options={options}
        value={selected}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={closeMenu}
        onChange={(option) => {
          onChange(option ? getOptionValue(option) : '');
          closeMenu();
        }}
        onBlur={onBlur}
        placeholder={placeholder}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isSearchable={isSearchable}
        isClearable={isClearable}
        closeMenuOnSelect
        blurInputOnSelect={false}
        aria-invalid={Boolean(error)}
        aria-required={required}
      />
    </div>
  );
};

const FormikSelect = ({ name, error, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <BaseSelect
      {...props}
      name={name}
      value={field.value}
      onChange={(next) => {
        helpers.setValue(next);
        helpers.setTouched(true, false);
      }}
      onBlur={() => helpers.setTouched(true)}
      error={error ?? (meta.touched ? meta.error : '')}
    />
  );
};

const Select = ({ name, value, onChange, ...props }) => {
  if (name != null && value === undefined && onChange === undefined) {
    return <FormikSelect name={name} {...props} />;
  }
  return <BaseSelect name={name} value={value} onChange={onChange} {...props} />;
};

export default Select;

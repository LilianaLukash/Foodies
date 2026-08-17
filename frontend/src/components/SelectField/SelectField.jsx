import Select from 'react-select';
import css from './SelectField.module.css';

const SelectField = ({
  options = [],
  value,
  onChange,
  placeholder,
  error,
  getOptionLabel = (option) => option.name,
  getOptionValue = (option) => option.id ?? option._id ?? option.name,
}) => {
  const selected =
    options.find((option) => getOptionValue(option) === value || option.name === value) || null;

  return (
    <div className={css.wrap}>
      <Select
        classNamePrefix="foodies"
        options={options}
        value={selected}
        onChange={(option) => onChange(option ? getOptionValue(option) : '')}
        placeholder={placeholder}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        isSearchable
        isClearable
      />
      {error ? <p className={css.error}>{error}</p> : null}
    </div>
  );
};

export default SelectField;

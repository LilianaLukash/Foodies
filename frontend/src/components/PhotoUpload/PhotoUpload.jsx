import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useField } from 'formik';
import Icon from '../Icon/Icon';
import css from './PhotoUpload.module.css';

const BasePhotoUpload = ({
  name,
  id = name,
  value,
  onChange,
  onBlur,
  error,
  accept = 'image/*',
  placeholder = 'Upload a photo',
  className,
}) => {
  const [objectUrl, setObjectUrl] = useState('');

  useEffect(() => {
    if (!(value instanceof File)) {
      setObjectUrl('');
      return undefined;
    }

    const url = URL.createObjectURL(value);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const preview = typeof value === 'string' && value ? value : objectUrl;

  return (
    <div className={clsx(css.root, error && css.hasError, className)}>
      <label className={css.upload} htmlFor={id}>
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <span className={css.placeholder}>
            <span className={css.iconStack} aria-hidden="true">
              <Icon name="icon-capture" className={css.frameIcon} size={44} sizeTablet={64} />
              <Icon name="icon-upload" className={css.cameraIcon} size={19} sizeTablet={28} />
            </span>
            <span className={css.text}>{placeholder}</span>
          </span>
        )}
        <input
          id={id}
          name={name}
          className="visually-hidden"
          type="file"
          accept={accept}
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            const file = event.currentTarget.files?.[0] ?? null;
            onChange?.(file);
            event.currentTarget.value = '';
          }}
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

const FormikPhotoUpload = ({ name, error, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <BasePhotoUpload
      {...props}
      name={name}
      value={field.value}
      onChange={(file) => {
        helpers.setValue(file);
        helpers.setTouched(true);
      }}
      onBlur={() => helpers.setTouched(true)}
      error={error ?? (meta.touched ? meta.error : '')}
    />
  );
};

const PhotoUpload = ({ name, value, onChange, ...props }) => {
  if (name != null && value === undefined && onChange === undefined) {
    return <FormikPhotoUpload name={name} {...props} />;
  }
  return <BasePhotoUpload name={name} value={value} onChange={onChange} {...props} />;
};

export default PhotoUpload;

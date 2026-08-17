import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { useAppDispatch } from '../../redux/hooks';
import { register } from '../../redux/auth/slice';
import { closeModal } from '../../redux/modals/slice';
import { getErrorMessage } from '../../utils/helpers';
import css from '../AuthForm/AuthForm.module.css';

const schema = Yup.object({
  name: Yup.string().min(3, 'At least 3 characters').required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
});

const SignUpForm = () => {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await dispatch(register(values)).unwrap();
          dispatch(closeModal());
        } catch (error) {
          toast.error(getErrorMessage({ message: error }));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <label className={css.field}>
            <Field
              className={errors.name && touched.name ? css.invalid : undefined}
              name="name"
              placeholder="Name*"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </label>
          <label className={css.field}>
            <Field
              className={errors.email && touched.email ? css.invalid : undefined}
              name="email"
              type="email"
              placeholder="Email*"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </label>
          <label className={css.field}>
            <Field
              className={errors.password && touched.password ? css.invalid : undefined}
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password*"
            />
            <button
              className={css.eye}
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Icon name={showPassword ? 'icon-eye' : 'icon-eye-off'} size={20} />
            </button>
            <ErrorMessage className={css.error} name="password" component="span" />
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;

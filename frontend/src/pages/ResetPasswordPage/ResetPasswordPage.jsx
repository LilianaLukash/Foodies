import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../../components/Button/Button';
import Icon from '../../components/Icon/Icon';
import { resetPassword } from '../../api/services';
import { getErrorMessage } from '../../utils/helpers';
import { useAppDispatch } from '../../redux/hooks';
import { openModal } from '../../redux/modals/slice';
import authCss from '../../components/AuthForm/AuthForm.module.css';
import css from './ResetPasswordPage.module.css';

const schema = Yup.object({
  password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [done, setDone] = useState(false);

  if (!token) {
    return (
      <section className={`container ${css.wrap}`}>
        <h1 className={css.title}>Invalid link</h1>
        <p className={css.text}>This password reset link is missing a token. Please request a new one.</p>
        <Link className={css.back} to="/">
          Back home
        </Link>
      </section>
    );
  }

  if (done) {
    return (
      <section className={`container ${css.wrap}`}>
        <h1 className={css.title}>Password updated</h1>
        <p className={css.text}>You can now sign in with your new password.</p>
        <button
          className={css.back}
          type="button"
          onClick={() => {
            navigate('/');
            dispatch(openModal('signIn'));
          }}
        >
          Sign in
        </button>
      </section>
    );
  }

  return (
    <section className={`container ${css.wrap}`}>
      <h1 className={css.title}>Set a new password</h1>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await resetPassword({ token, password: values.password });
            toast.success('Password has been reset');
            setDone(true);
          } catch (error) {
            toast.error(getErrorMessage(error));
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={authCss.form}>
            <label className={authCss.field}>
              <Field
                className={errors.password && touched.password ? authCss.invalid : undefined}
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="New password*"
              />
              <button
                className={authCss.eye}
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon name={showPassword ? 'icon-eye' : 'icon-eye-off'} size={20} />
              </button>
              <ErrorMessage className={authCss.error} name="password" component="span" />
            </label>
            <label className={authCss.field}>
              <Field
                className={errors.confirmPassword && touched.confirmPassword ? authCss.invalid : undefined}
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm new password*"
              />
              <ErrorMessage className={authCss.error} name="confirmPassword" component="span" />
            </label>
            <Button type="submit" disabled={isSubmitting}>
              Reset password
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ResetPasswordPage;

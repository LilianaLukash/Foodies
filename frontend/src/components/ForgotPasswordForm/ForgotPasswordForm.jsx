import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button';
import { forgotPassword } from '../../api/services';
import { getErrorMessage } from '../../utils/helpers';
import css from '../AuthForm/AuthForm.module.css';

const schema = Yup.object({
  email: Yup.string().email('Enter a valid email').required('Email is required'),
});

const ForgotPasswordForm = ({ onSent }) => {
  const [sentTo, setSentTo] = useState('');

  if (sentTo) {
    return (
      <p className={css.form}>
        We sent a password reset link to <strong>{sentTo}</strong>. Check your inbox to continue.
      </p>
    );
  }

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await forgotPassword(values.email);
          setSentTo(values.email);
          onSent?.(values.email);
        } catch (error) {
          toast.error(getErrorMessage(error));
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className={css.form}>
          <label className={css.field}>
            <Field
              className={errors.email && touched.email ? css.invalid : undefined}
              name="email"
              type="email"
              placeholder="Email*"
            />
            <ErrorMessage className={css.error} name="email" component="span" />
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Send reset link
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;

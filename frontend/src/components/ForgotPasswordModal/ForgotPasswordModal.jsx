import { useState } from 'react';
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm';
import { useAppDispatch } from '../../redux/hooks';
import { openModal } from '../../redux/modals/slice';
import modalCss from '../SignInModal/SignInModal.module.css';
import css from './ForgotPasswordModal.module.css';

const ForgotPasswordModal = () => {
  const dispatch = useAppDispatch();
  const [isSent, setIsSent] = useState(false);

  return (
    <div>
      <h2 className={modalCss.title}>Reset password</h2>
      {!isSent && (
        <p className={css.hint}>
          Enter the email linked to your account and we&apos;ll send you a link to set a new password.
        </p>
      )}
      <ForgotPasswordForm onSent={() => setIsSent(true)} />
      <p className={modalCss.switch}>
        Remembered your password?{' '}
        <button className={modalCss.link} type="button" onClick={() => dispatch(openModal('signIn'))}>
          Sign in
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordModal;

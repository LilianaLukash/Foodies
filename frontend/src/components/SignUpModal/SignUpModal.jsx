import SignUpForm from '../SignUpForm/SignUpForm';
import { useAppDispatch } from '../../redux/hooks';
import { openModal } from '../../redux/modals/slice';
import css from '../SignInModal/SignInModal.module.css';

const SignUpModal = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2 className={css.title}>Sign up</h2>
      <SignUpForm />
      <p className={css.switch}>
        I already have an account?{' '}
        <button className={css.link} type="button" onClick={() => dispatch(openModal('signIn'))}>
          Sign in
        </button>
      </p>
    </div>
  );
};

export default SignUpModal;

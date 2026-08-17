import SignInForm from '../SignInForm/SignInForm';
import { useAppDispatch } from '../../redux/hooks';
import { openModal } from '../../redux/modals/slice';
import modalCss from './SignInModal.module.css';

const SignInModal = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2 className={modalCss.title}>Sign in</h2>
      <SignInForm />
      <p className={modalCss.switch}>
        Don&apos;t have an account?{' '}
        <button className={modalCss.link} type="button" onClick={() => dispatch(openModal('signUp'))}>
          Create an account
        </button>
      </p>
    </div>
  );
};

export default SignInModal;

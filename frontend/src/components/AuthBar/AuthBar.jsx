import { useAppDispatch } from '../../redux/hooks';
import { openModal } from '../../redux/modals/slice';
import css from './AuthBar.module.css';

const AuthBar = () => {
  const dispatch = useAppDispatch();

  return (
    <div className={css.bar}>
      <button className={css.signIn} type="button" onClick={() => dispatch(openModal('signIn'))}>
        Sign in
      </button>
      <button className={css.signUp} type="button" onClick={() => dispatch(openModal('signUp'))}>
        Sign up
      </button>
    </div>
  );
};

export default AuthBar;

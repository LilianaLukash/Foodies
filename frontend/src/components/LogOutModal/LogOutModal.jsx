import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/auth/slice';
import { closeModal } from '../../redux/modals/slice';
import css from './LogOutModal.module.css';

const LogOutModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logout());
    dispatch(closeModal());
    navigate('/');
    toast.success('You have been logged out');
  };

  const onCancel = () => {
    dispatch(closeModal());
  };

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Are you logging out?</h2>

      <p className={css.text}>
        You can always log back in at my time.
      </p>

      <div className={css.actions}>
        <button
          className={css.logout}
          type="button"
          onClick={onLogout}
        >
          Log out
        </button>

        <button
          className={css.cancel}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogOutModal;
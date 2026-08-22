import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { STORAGE_KEYS } from '@constants';
import { storage } from '@utils/storage';
import Button from '../Button/Button';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/auth/slice';
import { closeModal } from '../../redux/modals/slice';
import { persistor } from '../../redux/store';
import css from './LogOutModal.module.css';

const LogOutModal = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logout());
    await persistor.purge();
    storage.remove(STORAGE_KEYS.TOKEN);
    dispatch(closeModal());
    navigate('/');
    toast.success('You have been logged out');
  };

  return (
    <div className={css.wrap}>
      <h2 className={css.title}>Log out</h2>
      <p className={css.text}>Are you sure you want to log out?</p>
      <button className={css.cancel} type="button" onClick={() => dispatch(closeModal())}>
        Cancel
      </button>
      <Button onClick={onLogout}>Log out</Button>
    </div>
  );
};

export default LogOutModal;

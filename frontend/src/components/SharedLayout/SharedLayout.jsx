import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Modal from '../Modal/Modal';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import LogOutModal from '../LogOutModal/LogOutModal';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { closeModal, selectModalType } from '../../redux/modals/slice';
import { fetchAreas, fetchCategories, fetchIngredients } from '../../redux/filters/slice';
import css from './SharedLayout.module.css';

const SharedLayout = () => {
  const modal = useAppSelector(selectModalType);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchAreas());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <>
      {isHome ? null : <Header />}
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-right" />
      {modal ? (
        <Modal onClose={() => dispatch(closeModal())}>
          {modal === 'signIn' ? <SignInModal /> : null}
          {modal === 'signUp' ? <SignUpModal /> : null}
          {modal === 'logOut' ? <LogOutModal /> : null}
        </Modal>
      ) : null}
    </>
  );
};

export default SharedLayout;

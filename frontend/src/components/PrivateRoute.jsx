import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectIsLoggedIn, selectIsRefreshing } from '../redux/auth/slice';
import { openModal } from '../redux/modals/slice';
import { useEffect } from 'react';
import Loader from './Loader/Loader';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const isRefreshing = useAppSelector(selectIsRefreshing);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isRefreshing && !isLoggedIn) dispatch(openModal('signIn'));
  }, [dispatch, isLoggedIn, isRefreshing]);

  if (isRefreshing) return <Loader />;
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

export default PrivateRoute;

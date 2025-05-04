import { Navigate, Outlet } from 'react-router';

const UnProtectedRoute = () => {
  const LOCALSTORAGE_NAME = import.meta.env.VITE_LOCALSTORAGE_NAME;
  const token = localStorage.getItem(LOCALSTORAGE_NAME);
  
  return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default UnProtectedRoute;

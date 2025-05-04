
import { Navigate, Outlet } from 'react-router';
import Topbar from './Topbar';

const ProtectedRoute = () => {
  const LOCALSTORAGE_NAME = import.meta.env.VITE_LOCALSTORAGE_NAME;
  const token = localStorage.getItem(LOCALSTORAGE_NAME);
  console.log(token, "token")

  return token ? <><Topbar /><Outlet /></> : <Navigate to="/login" replace />
};

export default ProtectedRoute;

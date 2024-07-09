import { Navigate, Outlet } from 'react-router-dom';
import routes from '../../../constants/routes';
import { getCookie } from '../../../utils/cookie';

const PrivateLayout = () => {
  const token = getCookie('authorization');

  if (!token) return <Navigate to={routes.login} replace />;

  return <Outlet />;
};

export default PrivateLayout;

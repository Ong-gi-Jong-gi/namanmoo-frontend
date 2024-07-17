import { Navigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import routes from '../constants/routes';
import { getCookie } from '../utils/cookie';

const LoginPage = () => {
  const token = getCookie('authorization');

  if (token) return <Navigate to={routes.main} replace />;
  return (
    <div className="flex h-full items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

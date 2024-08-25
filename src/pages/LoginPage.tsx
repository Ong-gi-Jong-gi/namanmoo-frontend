import { Navigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm';
import routes from '../constants/routes';

const LoginPage = () => {
  const token = localStorage.getItem('accessKey');

  if (token) return <Navigate to={routes.main} replace />;
  return (
    <div className="m-auto flex h-full max-w-[360px] items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

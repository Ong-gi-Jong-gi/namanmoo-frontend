import { Navigate } from 'react-router-dom';
import SignupForm from '../components/signup/SignupForm';
import routes from '../constants/routes';
import { getCookie } from '../utils/cookie';

const SignupPage = () => {
  const token = getCookie('authorization');

  if (token) return <Navigate to={routes.main} replace />;

  return <SignupForm />;
};

export default SignupPage;

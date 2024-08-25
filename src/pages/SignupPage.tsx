import { Navigate } from 'react-router-dom';
import SignupForm from '../components/signup/SignupForm';
import routes from '../constants/routes';

const SignupPage = () => {
  const token = localStorage.getItem('accessKey');

  if (token) return <Navigate to={routes.main} replace />;

  return (
    <div className="flex h-full flex-col">
      <div className="m-auto my-auto w-full max-w-[360px]">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;

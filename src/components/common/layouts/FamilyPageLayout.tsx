import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useGetUserInfo } from '../../../apis/user/getUserInfo';
import routes from '../../../constants/routes';

const FamilyPageLayout = () => {
  const navigate = useNavigate();
  const { userInfo, isLoading } = useGetUserInfo();

  useEffect(() => {
    if (!isLoading && userInfo.code) {
      navigate(routes.main);
    }
  }, [userInfo, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (userInfo.code) {
    return null;
  }

  return <Outlet />;
};

export default FamilyPageLayout;

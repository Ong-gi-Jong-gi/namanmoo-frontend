import { Outlet } from 'react-router-dom';

const PrivateLayout = () => {
  // TODO: 로그인 여부에 따라 로그인 페이지로 리다이렉트
  alert('로그인 유무 확인!');
  return <Outlet />;
};

export default PrivateLayout;

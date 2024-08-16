import QueryString from 'qs';
import { Navigate, Outlet } from 'react-router-dom';
import routes from '../../../constants/routes';

const PrivateLayout = () => {
  const token = localStorage.getItem('accessKey');

  if (!token) {
    const queryData = QueryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    return (
      <Navigate
        to={routes.login}
        state={{ code: queryData['code'] as string }}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PrivateLayout;

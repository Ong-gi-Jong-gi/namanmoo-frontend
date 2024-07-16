import QueryString from 'qs';
import { Navigate, Outlet } from 'react-router-dom';
import routes from '../../../constants/routes';
import { getCookie } from '../../../utils/cookie';

const PrivateLayout = () => {
  const token = getCookie('authorization');

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

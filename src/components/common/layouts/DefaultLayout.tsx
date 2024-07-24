import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';
import routes from '../../../constants/routes';

const mainBackgroundMap = {
  0: 'bg-main',
  1: 'bg-main1',
  2: 'bg-main2',
  3: 'bg-main3',
};

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const layoutClass = clsx(
    'relative m-auto h-full w-full max-w-[450px] bg-cover bg-center bg-no-repeat px-4 py-6 shadow-shadow-box',
    pathname.includes(routes.main) ? mainBackgroundMap['0'] : 'bg-background',
  );
  return (
    <div className={layoutClass}>
      <div className="h-full w-full overflow-y-scroll scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
};

export default DefaultLayout;

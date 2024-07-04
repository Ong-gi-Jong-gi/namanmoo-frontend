import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';
import routes from '../../../constants/routes';

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const layoutClass = clsx(
    'relative m-auto h-full w-full max-w-[450px] overflow-y-scroll bg-background p-12 scrollbar-hide',
    {
      'bg-main bg-cover bg-center': pathname === routes.main,
      'bg-background': pathname !== routes.main,
    },
  );
  return (
    <div className={layoutClass}>
      <Outlet />
    </div>
  );
};

export default DefaultLayout;

import clsx from 'clsx';
import { Outlet, useLocation } from 'react-router-dom';
import routes from '../../../constants/routes';

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const layoutClass = clsx(
    'relative m-auto h-full w-full max-w-[450px] bg-background p-12',
    {
      'bg-main bg-cover bg-center': pathname === routes.main,
      'bg-background': pathname !== routes.main,
    },
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

import clsx from 'clsx';
import { UserRole } from '../../types/family';

type ProfileType = 'default' | 'image' | 'disabled';
type ProfileSize = 'base' | 'small';
type ProfileLayout = 'horizontal' | 'vertical';

interface ProfileStyleProps {
  type?: ProfileType;
  size?: ProfileSize;
  layout?: ProfileLayout;
  isText?: boolean;
}

interface ProfileComponents extends ProfileStyleProps {
  src?: string;
  userName?: string;
  userRole?: UserRole | '-';
}

const profileSize = {
  base: 'w-16 h-16',
  small: 'w-12 h-12',
};

const getProfileImageSrc = (type: ProfileType, src: string) => {
  switch (type) {
    case 'default':
      return '/profile/default.svg';
    case 'image':
      return src;
    case 'disabled':
      return '/profile/disabled.svg';
  }
};

const Profile = ({
  type = 'default',
  size = 'base',
  layout = 'vertical',
  src = '',
  userName = '-',
  userRole = '-',
  isText = false,
}: ProfileComponents) => {
  const profileImageClass = clsx('rounded-full', profileSize[size]);
  const profileLayoutClass = clsx(
    'w-fit flex  items-center gap-3',
    layout == 'horizontal' ? 'flex-row' : 'flex-col',
  );
  const profileTextClass = clsx(
    'flex flex-col',
    layout == 'horizontal' ? 'items-start' : 'items-center',
  );

  return (
    <div className={profileLayoutClass}>
      {/* Profile Image Component */}
      <div className={profileImageClass}>
        <img
          src={getProfileImageSrc(type, src)}
          alt="사용자 프로필 이미지"
          className="h-full w-full"
        />
      </div>
      {/* Profile Text Component */}
      {isText && (
        <div className={profileTextClass}>
          <span className="text-pretendard-base font-pretendard-bold text-black">
            {userName}
          </span>
          <span className="text-pretendard-sm font-pretendard-normal text-gray-40">
            {userRole}
          </span>
        </div>
      )}
    </div>
  );
};

export default Profile;

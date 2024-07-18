import clsx from 'clsx';
import DefaultImage from '../../assets/profile/default.svg';
import DisabledImage from '../../assets/profile/disabled.svg';
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
      return DefaultImage;
    case 'image':
      return src;
    case 'disabled':
      return DisabledImage;
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
  const profileImageClass = clsx(
    'overflow-hidden rounded-full',
    profileSize[size],
  );
  const profileLayoutClass = clsx(
    'flex w-fit items-center gap-3',
    layout == 'horizontal' ? 'flex-row' : 'flex-col',
  );
  const profileTextClass = clsx(
    'flex flex-col',
    layout == 'horizontal' ? 'max-w-20 items-start' : 'max-w-16 items-center',
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
          <span className="w-full truncate text-pretendard-base font-pretendard-bold text-black">
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

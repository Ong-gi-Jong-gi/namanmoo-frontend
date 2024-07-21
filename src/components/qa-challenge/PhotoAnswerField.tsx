import { FaLock } from 'react-icons/fa';
import { SYS_MESSAGE } from '../../constants/message';
import { UserRole } from '../../types/family';
import Profile from '../common/Profile';

interface PhotoAnswerFieldProps {
  role: UserRole;
  nickname: string;
  answer: string | null;
  userImg: string;
  canView: boolean;
}

const PhotoAnswerField = ({
  role,
  nickname,
  answer,
  userImg,
  canView,
}: PhotoAnswerFieldProps) => {
  return (
    <div className="flex h-4/5 w-full flex-col gap-4 rounded-2xl bg-white p-4 shadow-card">
      <Profile
        type={userImg ? 'image' : 'default'}
        layout="horizontal"
        userName={nickname}
        userRole={role}
        src={userImg}
        isText
      />
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl bg-paper">
        {answer && (
          <div className="relative flex justify-center gap-1">
            <img
              src={answer}
              className={`flex-1 ${!canView && answer ? 'blur-md' : ''}`}
              alt="user-image"
            />
            {!canView && answer && (
              <FaLock
                size={24}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
              />
            )}
          </div>
        )}
        {!answer && (
          <div className="font-ryurue text-ryurue-base text-gray-40">
            {SYS_MESSAGE.ANSWER_YET}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoAnswerField;

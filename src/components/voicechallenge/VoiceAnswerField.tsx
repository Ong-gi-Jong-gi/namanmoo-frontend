import clsx from 'clsx';
import { useRef } from 'react';
import { FaLock } from 'react-icons/fa6';
import { SYS_MESSAGE } from '../../constants/message';
import { UserRole } from '../../types/family';
import Profile from '../common/Profile';
import ListenButton from './ListenButton';

interface VoiceAnswerFieldProps {
  nickname: string;
  role: UserRole;
  answer: string | null;
  userImg?: string;
  canView?: boolean;
}

const VoiceAnswerField = ({
  nickname,
  role,
  answer,
  userImg,
  canView,
}: VoiceAnswerFieldProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const answerClass = clsx('font-ryurue text-ryurue-base', {
    'text-gray-40': !answer,
    'blur-sm': !canView && answer,
  });
  return (
    <div className="flex flex-col gap-5">
      <Profile
        type={userImg ? 'image' : 'default'}
        layout="horizontal"
        isText
        userName={nickname}
        userRole={role}
        src={userImg}
      />
      <div className="relative">
        <span className={answerClass}>
          {answer ? (
            <>
              <ListenButton audioRef={audioRef} />
              <audio
                ref={audioRef}
                className="hidden w-full"
                controls
                src={answer}
              />
            </>
          ) : (
            SYS_MESSAGE.ANSWER_YET
          )}
        </span>
        {!canView && answer && (
          <FaLock
            size={24}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
          />
        )}
      </div>
    </div>
  );
};

export default VoiceAnswerField;

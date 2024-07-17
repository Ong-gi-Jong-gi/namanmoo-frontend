import clsx from 'clsx';
import { useRef, useState } from 'react';
import { SYS_MESSAGE } from '../../constants/message';
import useBottomSheetStore from '../../store/bottomSheetStore';
import { UserRole } from '../../types/family';
import Button from '../common/Button';
import Profile from '../common/Profile';
import ListenButton from './ListenButton';
import VideoTranscriber from './VoiceTranscriber';

interface VoiceAnswerEditorProps {
  role: UserRole;
  answer: string | null;
  userImg?: string;
  question: string;
  challengeId: string;
}

const VoiceAnswerEditor = ({
  role,
  answer,
  userImg,
  question,
  challengeId,
}: VoiceAnswerEditorProps) => {
  const { upBottomSheet } = useBottomSheetStore();
  const [status, setStatus] = useState<'view' | 'edit'>('view');
  const { downBottomSheet } = useBottomSheetStore();
  const audioRef = useRef(null);

  const answerClass = clsx('flex gap-3 font-ryurue text-ryurue-base', {
    'text-gray-40': !answer,
  });

  const downTrigger = () => {
    setStatus('view');
    downBottomSheet();
  };

  const handleClick = () => {
    if (window.confirm(SYS_MESSAGE.EDIT)) {
      setStatus('edit');
      upBottomSheet({
        content: (
          <VideoTranscriber
            challengeId={challengeId}
            downTrigger={downTrigger}
            question={question}
          />
        ),
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Profile
        type={userImg ? 'image' : 'default'}
        layout="horizontal"
        userName="나"
        userRole={role}
        src={userImg}
        isText
      />
      {status === 'view' && (
        <span className={answerClass} onClick={handleClick}>
          {answer ? (
            <>
              <ListenButton audioRef={audioRef} />
              <audio ref={audioRef} className="hidden" controls src={answer} />
              <Button
                label="수정"
                theme="neutral"
                size="medium"
                onClick={handleClick}
              />
            </>
          ) : (
            SYS_MESSAGE.WRITE
          )}
        </span>
      )}
      {status === 'edit' && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 font-ryurue text-ryurue-base text-gray-40">
            음성 녹음 중입니다...
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAnswerEditor;

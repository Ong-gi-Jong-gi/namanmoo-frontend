import clsx from 'clsx';
import { useState } from 'react';
import { SYS_MESSAGE } from '../../constants/message';
import useBottomSheetStore from '../../store/bottomSheetStore';
import { UserRole } from '../../types/family';
import Button from '../common/Button';
import Profile from '../common/Profile';
import AudioTranscriber from './VoiceTranscriber';

interface VoiceAnswerEditorProps {
  role: UserRole;
  answer: string | null;
  userImg?: string;
  question: string;
  mutate: (fileData: File | null) => void;
}

const VoiceAnswerEditor = ({
  role,
  answer,
  userImg,
  question,
  mutate,
}: VoiceAnswerEditorProps) => {
  const { upBottomSheet } = useBottomSheetStore();
  const [status, setStatus] = useState<'view' | 'edit'>('view');
  const { downBottomSheet } = useBottomSheetStore();

  const answerClass = clsx('flex gap-3 font-ryurue text-ryurue-base', {
    'text-gray-40': !answer,
  });

  const downTrigger = () => {
    downBottomSheet();
    setStatus('view');
  };

  const handleClick = () => {
    if (window.confirm(SYS_MESSAGE.EDIT)) {
      setStatus('edit');
      upBottomSheet({
        content: (
          <AudioTranscriber
            mutate={mutate}
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
        <span className={answerClass}>
          {answer ? (
            <>
              <audio className="flex-1" controls src={answer} />
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

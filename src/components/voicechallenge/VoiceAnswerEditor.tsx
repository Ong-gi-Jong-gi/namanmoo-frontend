import clsx from 'clsx';
import React, { useMemo, useRef, useState } from 'react';
import { SYS_MESSAGE } from '../../constants/message';
import useBottomSheetStore from '../../store/bottomSheetStore';
import { UserRole } from '../../types/family';
import Button from '../common/Button';
import Profile from '../common/Profile';
import ListenButton from './ListenButton';
import VoiceRecoder from './VoiceRecoder';

interface VoiceAnswerEditorProps {
  role: UserRole;
  answer: string | null;
  userImg?: string;
  question: string;
  challengeId: string;
}

const VoiceAnswerEditor: React.FC<VoiceAnswerEditorProps> = ({
  role,
  answer,
  userImg,
  question,
  challengeId,
}) => {
  const { upBottomSheet, downBottomSheet } = useBottomSheetStore();
  const [status, setStatus] = useState<'view' | 'edit'>('view');
  const audioRef = useRef<HTMLAudioElement>(null);

  const challengeTitleInfo = useMemo(() => {
    return question.split('/');
  }, [question]);

  const answerClass = clsx('flex gap-3 font-ryurue text-ryurue-base', {
    'text-gray-40': !answer,
  });

  const downTrigger = () => {
    setStatus('view');
    downBottomSheet();
  };

  const handleClick = () => {
    setStatus('edit');
    upBottomSheet({
      content: (
        <VoiceRecoder
          challengeId={challengeId}
          downTrigger={downTrigger}
          musicLyric={challengeTitleInfo[1]}
          musicInfo={challengeTitleInfo[2]}
          existedVoice={answer}
        />
      ),
    });
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
            <p className="w-full" onClick={handleClick}>
              {SYS_MESSAGE.WRITE}
            </p>
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

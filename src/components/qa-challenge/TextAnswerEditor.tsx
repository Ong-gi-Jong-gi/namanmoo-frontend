import clsx from 'clsx';
import { useState } from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { SYS_MESSAGE } from '../../constants/message';
import { UserRole } from '../../types/family';
import Profile from '../common/Profile';
import Textarea from '../common/Textarea';

interface TextAnswerEditorProps {
  role: UserRole;
  answer: string | null;
  userImg?: string;
  mutate: ({ answer }: { answer: string }) => void;
}

const TextAnswerEditor = ({
  role,
  answer,
  userImg,
  mutate,
}: TextAnswerEditorProps) => {
  const [value, setValue] = useState<string>(answer || '');
  const [status, setStatus] = useState<'view' | 'edit'>('view');
  // const { mutate } = usePostNormalChallenge();

  const answerClass = clsx('font-ryurue text-ryurue-base', {
    'text-gray-40': !answer,
  });
  const handleClick = () => {
    confirm(SYS_MESSAGE.EDIT) && setStatus('edit');
  };
  const handleCancel = () => {
    if (confirm(SYS_MESSAGE.CANCEL)) {
      setStatus('view');
      setValue(answer || '');
    }
  };
  const handleSave = () => {
    confirm(SYS_MESSAGE.SAVE) &&
      mutate({
        answer: value,
      });
    setStatus('view');
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
          {answer || SYS_MESSAGE.WRITE}
        </span>
      )}
      {status === 'edit' && (
        <div className="flex flex-col gap-2">
          <div className="ml-auto flex gap-2">
            <FaXmark
              onClick={handleCancel}
              size={24}
              className="cursor-pointer text-gray-40 transition-colors duration-200 hover:text-red"
            />
            <FaCheck
              onClick={handleSave}
              size={24}
              className="cursor-pointer text-gray-40 transition-colors duration-200 hover:text-primary-30"
            />
          </div>
          <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
      )}
    </div>
  );
};

export default TextAnswerEditor;

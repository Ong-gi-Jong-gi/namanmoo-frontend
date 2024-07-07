import clsx from 'clsx';
import { useState } from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { usePostNormalChallenge } from '../../apis/challenge/postNormalChallenge';
import { UserRole } from '../../types/family';
import Profile from '../common/Profile';
import Textarea from '../common/Textarea';

interface TextAnswerEditorProps {
  role: UserRole;
  answer: string | null;
  userImg?: string;
}

const TextAnswerEditor = ({ role, answer, userImg }: TextAnswerEditorProps) => {
  const { challengeId } = useParams<{ challengeId: string }>();
  const [value, setValue] = useState<string>(answer || '');
  const [status, setStatus] = useState<'view' | 'edit'>('view');
  const { mutate } = usePostNormalChallenge({
    challengeId: challengeId || '',
    answer: value,
  });
  const answerClass = clsx('font-ryurue text-ryurue-base', {
    'text-gray-40': !answer,
  });
  const handleClick = () => {
    confirm('수정하시겠습니까?') && setStatus('edit');
  };
  const handleCancel = () => {
    if (confirm('작성 중인 내용이 사라집니다. 취소하시겠습니까?')) {
      setStatus('view');
      setValue(answer || '');
    }
  };
  const handleSave = () => {
    confirm('저장하시겠습니까?') && mutate();
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
          {answer || '눌러서 답변을 작성해주세요'}
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

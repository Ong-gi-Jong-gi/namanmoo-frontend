import clsx from 'clsx';
import { UserRole } from '../../types/family';
import Profile from '../common/Profile';

interface AnswerFieldProps {
  nickname: string;
  role: UserRole;
  answer: string | null;
  userImg?: string;
}

const AnswerField = ({ nickname, role, answer, userImg }: AnswerFieldProps) => {
  const answerClass = clsx('font-ryurue text-ryurue-base', {
    'text-gray-40': !answer,
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
      <span className={answerClass}>
        {answer || '아직 답변하지 않았습니다.'}
      </span>
    </div>
  );
};

export default AnswerField;

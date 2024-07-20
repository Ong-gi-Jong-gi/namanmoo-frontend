import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetTodayChallenge } from '../../apis/challenge/getTodayChallenge';
import routes from '../../constants/routes';
import useModalStore from '../../store/modalStore';
import Button from '../common/Button';
import ChallengeButton from './ChallengeButton';
import RiveLucky from './RiveLucky';

const TodayChallengeSection = () => {
  const {
    data: { challengeInfo, isDone },
  } = useGetTodayChallenge();
  const { openModal, closeModal } = useModalStore();
  const navigate = useNavigate();

  const handleMoveRecap = () => {
    navigate(routes.mypage);
    closeModal();
  };

  useEffect(() => {
    if (isDone)
      openModal({
        content: (
          <div className="flex flex-col items-center gap-4">
            <div className="font-ryurue text-ryurue-md">
              🏆 챌린지 완료!! 🏆
            </div>
            <RiveLucky level={3} isBubble={true} />
            <Button
              label="리캡 보러가기"
              size="small"
              type="full"
              onClick={handleMoveRecap}
            />
          </div>
        ),
        showCloseBtn: true,
      });
  }, []);

  if (!challengeInfo)
    return <ChallengeButton type="active" text="챌린지 시작" />;
  return (
    <ChallengeButton
      type="ongoing"
      challengeId={challengeInfo.challengeId}
      text={challengeInfo.challengeTitle}
      day={challengeInfo.challengeNumber}
      theme={challengeInfo.challengeType}
    />
  );
};

export default TodayChallengeSection;

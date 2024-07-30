import { useGetChallengeList } from '../apis/challenge/getChallengeList';
import ChallengeListUnit from '../components/challengelist/ChallengeListUnit';
import Header from '../components/common/Header';
import { SYS_MESSAGE } from '../constants/message';

const ChallengeListPage = () => {
  const { hasData, isLoading, challenges } = useGetChallengeList();

  if (isLoading) <div>Loading...</div>;
  if (!hasData) <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full flex-col gap-3">
      <Header />
      <p className="text-center font-pretendard text-pretendard-md font-pretendard-bold">
        챌린지
      </p>
      {challenges.length > 0 ? (
        <div className="flex flex-1 flex-col gap-4 overflow-scroll scrollbar-hide">
          {challenges.map((challenge) => (
            <ChallengeListUnit key={challenge.challengeId} {...challenge} />
          ))}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center font-ryurue text-ryurue-md text-gray-40">
          {SYS_MESSAGE.NO_CHALLENGE}
        </div>
      )}
    </div>
  );
};

export default ChallengeListPage;

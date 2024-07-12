import { useState } from 'react';
import { useGetChallengeList } from '../apis/challenge/getChallengeList';
import ChallengeListUnit from '../components/challengelist/ChallengeListUnit';
import Header from '../components/common/Header';
import { SYS_MESSAGE } from '../constants/message';

const ChallengeListPage = () => {
  const [date] = useState(new Date().getTime());
  const { hasData, isLoading, challenges } = useGetChallengeList({
    date,
  });

  if (isLoading) <div>Loading...</div>;
  if (!hasData) <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full flex-col">
      <Header title="챌린지 리스트" />
      <div className="flex flex-1 flex-col gap-3 overflow-scroll scrollbar-hide">
        {challenges.map((challenge) => (
          <ChallengeListUnit key={challenge.challengeId} {...challenge} />
        ))}
      </div>
    </div>
  );
};

export default ChallengeListPage;

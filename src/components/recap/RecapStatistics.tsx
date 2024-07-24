import { useGetRecapStatistics } from '../../apis/recap/getRecapStatistics';
import { SYS_MESSAGE } from '../../constants/message';
import RecapStatisticsTopic from './RecapStatisticsTopic';

const RecapStatistics = ({ luckyId }: { luckyId: string }) => {
  const { hasData, isLoading, topics } = useGetRecapStatistics({ luckyId });

  if (isLoading) return <div>Loading...</div>;
  if (!hasData) return <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <p className="w-full whitespace-pre-line py-4 text-pretendard-md font-pretendard-bold">
        가족들과
        <br />
        무언가를 함께한다는 건<br />
        정말 행복한 일이죠.
      </p>
      <div className="w-full">
        {topics.map((topic) => (
          <RecapStatisticsTopic key={topic.challengeId} {...topic} />
        ))}
      </div>
    </div>
  );
};

export default RecapStatistics;

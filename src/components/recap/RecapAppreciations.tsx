import { useGetRecapAppreciations } from '../../apis/recap/getRecapAppreciations.ts';
import { RecapAppreciationsType } from '../../types/recap.ts';
import RecapThanksAndSorryUnit from './RecapAppreciationsUnit.tsx';

const RecapAppreciations = ({ luckyId }: { luckyId: string }) => {
  const { appreciations, isLoading } = useGetRecapAppreciations({ luckyId });

  if (isLoading) <div>Loading...</div>;

  return (
    <div className="relative h-full">
      <p className="w-full whitespace-pre-line py-4 text-right text-pretendard-md font-pretendard-bold">
        가족들과
        <br />
        무언가를 함께한다는 건<br />
        정말 행복한 일이죠.
      </p>
      <div className="h-full w-full">
        {appreciations.map((migo: RecapAppreciationsType, index: number) => (
          <RecapThanksAndSorryUnit key={migo.userId} {...migo} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RecapAppreciations;

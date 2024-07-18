import { RecapRankingDTO } from '../../apis/dtos/recapDtos';
import { useGetRecapRank } from '../../apis/recap/getRecapRank';
import { SYS_MESSAGE } from '../../constants/message';
import Lucky from '../main/Lucky';
import RecapRankingUnit from './RecapRankingUnit';

const RecapRank = ({ luckyId }: { luckyId: string }) => {
  const { hasData, isLoading, ranking, recapDetail, maxCount } =
    useGetRecapRank({
      luckyId,
    });

  if (isLoading) <div>isLoading...</div>;
  if (hasData) <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full flex-col items-center gap-6">
      {/* <p className="w-full whitespace-pre-line py-4 text-pretendard-md font-pretendard-bold">
        가족들과
        <br />
        무언가를 함께한다는 건<br />
        정말 행복한 일이죠.
      </p> */}
      <div className="flex min-h-[160px] flex-1 items-center">
        <Lucky level={recapDetail.luckyStatus} />
      </div>
      <p className="font-ryurue text-ryurue-base">
        이 행운이는 총
        <span className="mx-2 text-red">{`${recapDetail.totalCount}`}</span>번
        사랑을 받은 행운이에요.
      </p>
      <div className="flex w-full flex-col justify-between gap-3 first:mb-2">
        {ranking.map((rank: RecapRankingDTO) => (
          <RecapRankingUnit
            key={rank.userId}
            {...rank}
            isFirst={rank.count == maxCount}
          />
        ))}
      </div>
    </div>
  );
};

export default RecapRank;

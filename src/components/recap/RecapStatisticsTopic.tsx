import { useNavigate } from 'react-router-dom';
import { RECAP_STATISTICS_QUESTION } from '../../constants/recap';
import routes from '../../constants/routes';
import { RecapStatistics } from '../../types/recap';
import { formatTime } from '../../utils/formatter';

const RecapStatisticsTopic = ({
  topic,
  topicResult,
  challengeNumber,
  challengeTitle,
  challengeType,
  challengeId,
}: RecapStatistics) => {
  const navigate = useNavigate();
  const handleTopiClick = () => {
    navigate(`${routes.challenge}/${challengeId}`, {
      state: { type: challengeType },
    });
  };

  const handleStatistics = {
    mostViewed: (value: number) => {
      return `${new Intl.NumberFormat('en-US').format(value)} 회`;
    },
    fastestAnswered: (value: number) => {
      return `${formatTime(value)}`;
    },
  } as const;

  return (
    <div className="relative z-20">
      <h3 className="relative z-30 rounded-full bg-secondary-10 px-4 py-1 font-ryurue text-ryurue-base">
        <span className="mr-3 text-secondary-20">Q.</span>
        {
          RECAP_STATISTICS_QUESTION[
            topic as keyof typeof RECAP_STATISTICS_QUESTION
          ]
        }
      </h3>
      <div className="relative -top-4 z-0 m-auto w-[95%] rounded-bl-xl rounded-br-xl bg-gray-20 p-4 pt-8">
        <div className="flex flex-col gap-2 rounded-lg bg-white p-3 font-ryurue text-ryurue-base">
          <div className="flex justify-between">
            <p className="text-secondary-20">{`#${parseInt(challengeNumber) > 10 ? challengeNumber : '0' + challengeNumber}`}</p>
            <p className="text-e text-gray-40" onClick={handleTopiClick}>
              바로가기 &gt;&gt;
            </p>
          </div>
          <p className="h-full truncate text-ellipsis text-ryurue-base">
            {challengeTitle}
          </p>
          <p className="w-full text-right">
            {handleStatistics[topic as keyof typeof RECAP_STATISTICS_QUESTION](
              topicResult,
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecapStatisticsTopic;

import { useNavigate } from 'react-router-dom';
import routes from '../../constants/routes';
import { RecapStatistics } from '../../types/recap';

const RecapStatisticsTopic = ({
  topic,
  topicResult,
  challengeNumber,
  challengeTitle,
  challengeType,
}: RecapStatistics) => {
  const navigate = useNavigate();
  const handleTopiClick = () => {
    navigate(`${routes.challenge}/${challengeNumber}`, {
      state: { type: challengeType },
    });
  };

  return (
    <div className="relative z-20" onClick={handleTopiClick}>
      <h3 className="relative z-30 rounded-full bg-secondary-10 px-4 py-1 font-ryurue text-ryurue-base">
        <span className="mr-3 text-secondary-20">Q.</span>
        {topic}?
      </h3>
      <div className="relative -top-4 z-0 m-auto w-[95%] rounded-bl-xl rounded-br-xl bg-gray-20 p-4 pt-8">
        <div className="flex flex-col gap-2 rounded-lg bg-white p-3 font-ryurue text-ryurue-base">
          <p className="text-pretendard-md text-secondary-20">{`#${parseInt(challengeNumber) > 10 ? challengeNumber : '0' + challengeNumber}`}</p>
          <p className="h-full truncate text-ellipsis text-ryurue-base">
            {`${challengeTitle}`}
          </p>
          <p className="w-full text-right">{topicResult} 회</p>
        </div>
      </div>
    </div>
  );
};

export default RecapStatisticsTopic;

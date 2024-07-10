import { useParams } from 'react-router-dom';
import { useGetPhotoChallenge } from '../../apis/challenge/getPhotoChallenge';
import { SYS_MESSAGE } from '../../constants/message';
import { formatDate } from '../../utils/formatter';
import ChallengeHeader from './ChallengeHeader';
import PhotoAnswerEditor from './PhotoAnswerEditor';
import PhotoAnswerField from './PhotoAnswerField';

const PhotoChallengeContainer = () => {
  const { challengeId } = useParams();
  const { isLoading, hasData, myAnswer, answerList, challengeInfo } =
    useGetPhotoChallenge({ challengeId });

  if (isLoading) return <div>Loading...</div>;

  if (!hasData || !myAnswer || !challengeInfo)
    return <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex w-full flex-1 flex-col gap-16">
      <div>
        <ChallengeHeader
          challengeNumber={challengeInfo.challengeNumber}
          challengeDate={formatDate(challengeInfo.challengeDate)}
          challengeTitle={challengeInfo.challengeTitle}
        />
        <p className="text-md text-gray-0 font-ryurue">
          가로 스크롤을 통해 가족들의 사진을 구경하세요!
        </p>
      </div>
      <div className="w-full flex-1 overflow-scroll">
        <div className="flex h-full w-[400%] gap-4 px-2">
          <PhotoAnswerEditor
            role={myAnswer.role}
            answer={myAnswer.answer}
            userImg={myAnswer.userImg}
          />
          {answerList.map((answer) => (
            <PhotoAnswerField
              key={answer.userId}
              canView={challengeInfo.isComplete}
              answer={answer.answer}
              nickname={answer.nickname}
              role={answer.role}
              userImg={answer.userImg}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoChallengeContainer;

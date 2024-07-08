interface ChallengeHeaderProps {
  challengeNumber?: string;
  challengeDate?: string;
  challengeTitle: string;
}

const ChallengeHeader = ({
  challengeNumber,
  challengeDate,
  challengeTitle,
}: ChallengeHeaderProps) => {
  return (
    <div className="flex w-full flex-col gap-4 font-pretendard">
      {challengeNumber && challengeDate && (
        <div className="space-x-6 text-pretendard-base font-pretendard-normal text-gray-40">
          <span>#{challengeNumber}번째 질문</span>
          <span>{challengeDate}</span>
        </div>
      )}
      <span className="text-pretendard-md font-pretendard-bold">
        {challengeTitle}
      </span>
    </div>
  );
};

export default ChallengeHeader;

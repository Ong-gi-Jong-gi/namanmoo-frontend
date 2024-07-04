const ChallengeButton = () => {
  return (
    <div className="bg-paper grid h-32 w-full grid-rows-[24px_1fr] gap-2 rounded-md bg-contain px-9 py-5 font-ryurue shadow">
      <div className="flex items-center">
        <span className="text-ryurue-sm">Day</span>
        <span className="mx-2 text-ryurue-base text-red">1</span>
      </div>
      <span className="text-ryurue-md">가족에게 전화하기</span>
    </div>
  );
};

export default ChallengeButton;

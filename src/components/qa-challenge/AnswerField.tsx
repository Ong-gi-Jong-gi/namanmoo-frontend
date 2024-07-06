import Profile from '../common/Profile';

const AnswerField = () => {
  return (
    <div className="flex flex-col gap-5">
      <Profile layout="horizontal" isText userName="미미" userRole="딸" />
      <span className="font-ryurue text-ryurue-base">
        냉장고에 넣어둔 아이스크림 다 먹어버린 거 미안해.
      </span>
    </div>
  );
};

export default AnswerField;

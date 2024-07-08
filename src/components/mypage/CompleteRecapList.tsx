import { useGetRecapList } from '../../apis/recap/getRecapList';
import { SYS_MESSAGE } from '../../constants/message';
import { RecapUnit } from '../../types/recap';
import CompleteRecapUnit from './CompleteRecapUnit';

const CompleteRecapList = () => {
  const { recapList, isLoading, hasData } = useGetRecapList();

  if (isLoading) <div>Loading...</div>;
  if (!hasData || !recapList) <div>{SYS_MESSAGE.NO_DATA}</div>;

  return (
    <div className="flex h-full flex-1 flex-col">
      <h3 className="flex-1 font-ryurue text-ryurue-md">추억 저장소</h3>
      <div className="overflow-scroll">
        <div className="grid grid-cols-2 gap-3">
          {recapList.map((recapUnit: RecapUnit) => (
            <CompleteRecapUnit key={recapUnit.luckyId} {...recapUnit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompleteRecapList;

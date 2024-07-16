import { useGetRecapList } from '../../apis/recap/getRecapList';
import { RecapUnit } from '../../types/recap';
import CompleteRecapUnit from './CompleteRecapUnit';

const CompleteRecapList = () => {
  const { recapList, isLoading, hasData } = useGetRecapList();

  if (isLoading) <div>Loading...</div>;

  return (
    <div className="flex h-full flex-1 flex-col gap-3">
      <h3 className="font-ryurue text-ryurue-md">추억 저장소</h3>
      <div className="flex-1 overflow-scroll scrollbar-hide">
        {recapList && (
          <div className="grid grid-cols-2 gap-3">
            {recapList.map((recapUnit: RecapUnit) => (
              <CompleteRecapUnit key={recapUnit.luckyId} {...recapUnit} />
            ))}
          </div>
        )}

        {(!hasData || !recapList) && (
          <div className="flex h-full items-center justify-center font-ryurue text-ryurue-md text-gray-40">
            <p>추억을 만들어보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteRecapList;

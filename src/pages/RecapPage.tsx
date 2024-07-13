import QueryString from 'qs';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RecapAppreciations from '../components/recap/RecapAppreciations';
import RecapBarUnit from '../components/recap/RecapBarUnit';
import RecapEnding from '../components/recap/RecapEnding';
import RecapFaceTime from '../components/recap/RecapFaceTime';
import RecapFamilyPhoto from '../components/recap/RecapFamilyPhoto';
import RecapRank from '../components/recap/RecapRank';
import RecapStatistics from '../components/recap/RecapStatistics';
import RecapYoungPhoto from '../components/recap/RecapYoungPhoto';
import { RECAP_LENGTH } from '../constants/recap';
import routes from '../constants/routes';

const RecapPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { luckyId } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as { luckyId: string };

  const [recapPage, setRecapPage] = useState(0);

  const recapContent = () => {
    if (recapPage == 0) return <RecapRank luckyId={luckyId} />;
    else if (recapPage == 1) return <RecapFaceTime />;
    else if (recapPage == 2) return <RecapStatistics luckyId={luckyId} />;
    else if (recapPage == 3) return <RecapYoungPhoto />;
    else if (recapPage == 4) return <RecapAppreciations luckyId={luckyId} />;
    else if (recapPage == 5) return <RecapFamilyPhoto />;
    else if (recapPage == 6) return <RecapEnding />;
    else return <div>NO RECAP</div>;
  };

  const handleRecapNextPage = () => {
    if (recapPage < RECAP_LENGTH - 1) {
      console.log(recapPage + 1);
      setRecapPage((pre) => pre + 1);
    } else navigate(routes.mypage);
  };

  const handleRecapPrePage = () => {
    if (recapPage > 0) setRecapPage((pre) => pre - 1);
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="relative z-0 flex gap-1">
        {new Array(RECAP_LENGTH).fill(0).map((_, index: number) => (
          <RecapBarUnit
            key={index}
            isTarget={index == recapPage}
            isBright={index <= recapPage}
          />
        ))}
      </div>
      <div className="flex-1">{recapContent()}</div>
      <div className="absolute left-0 top-0 flex h-full w-full">
        <div onClick={handleRecapPrePage} className="h-full w-full" />
        <div onClick={handleRecapNextPage} className="h-full w-full" />
      </div>
    </div>
  );
};

export default RecapPage;

import QueryString from 'qs';
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
  const { luckyId, page = 1 } = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as unknown as { luckyId: string; page?: number };

  const recapContent = () => {
    if (page == 1) return <RecapRank luckyId={luckyId} />;
    else if (page == 2) return <RecapFaceTime luckyId={luckyId} />;
    else if (page == 3) return <RecapStatistics luckyId={luckyId} />;
    else if (page == 4) return <RecapYoungPhoto luckyId={luckyId} />;
    else if (page == 5) return <RecapAppreciations luckyId={luckyId} />;
    else if (page == 6) return <RecapFamilyPhoto luckyId={luckyId} />;
    else if (page == 7) return <RecapEnding />;
    else return <div>NO RECAP</div>;
  };

  const handleRecapNextPage = () => {
    if (page < RECAP_LENGTH) {
      console.log(typeof page);
      const nextPage = parseInt(page.toString()) + 1;
      navigate(`${routes.recap}?luckyId=${luckyId}&page=${nextPage}`, {
        replace: true,
      });
    } else navigate(-1);
  };

  const handleRecapPrePage = () => {
    if (page > 1)
      navigate(`${routes.recap}?luckyId=${luckyId}&page=${page - 1}`, {
        replace: true,
      });
  };

  return (
    <div className="flex h-full flex-col gap-2">
      <div className="relative z-0 flex gap-1">
        {new Array(RECAP_LENGTH).fill(0).map((_, index: number) => (
          <RecapBarUnit
            key={index}
            isTarget={index == page - 1}
            isBright={index <= page - 1}
          />
        ))}
      </div>
      <div className="flex-1">{recapContent()}</div>
      <div className="absolute left-0 top-0 flex h-full w-full justify-between">
        <div onClick={handleRecapPrePage} className="h-full w-1/4" />
        <div onClick={handleRecapNextPage} className="h-full w-1/4" />
      </div>
    </div>
  );
};

export default RecapPage;

import QueryString from 'qs';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetChallengeStartDate } from '../apis/challenge/getChallengeStartDate';
import { useGetMyFamilyInfo } from '../apis/family/getMyFamilyInfo';
import ChallengeSection from '../components/main/ChallengeSection';
import FamilyList from '../components/main/FamilyList';
import InviteModal from '../components/main/InviteModal';
import Navbar from '../components/main/Navbar';
import routes from '../constants/routes';
import useModalStore from '../store/modalStore';

const MainPage = () => {
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const { data: familyList, isLoading: familyLoading } = useGetMyFamilyInfo();
  const { isLoading: startDateLoading } = useGetChallengeStartDate({
    enabled: localStorage.getItem('challengeDate') == null,
  });
  const { openModal } = useModalStore();

  // useEffect(() => {

  //   const challengeDate = localStorage.getItem('challengeStartDate');
  //   localStorage.setItem('challengeStartData', challengeDate);
  // }, [challengeDate]);

  useEffect(() => {
    if (!familyLoading && familyList?.length === 1) {
      openModal({
        content: <InviteModal code={queryData['code'] as string} />,
        showCloseBtn: true,
      });
    }
  }, [familyList, familyLoading, openModal, queryData]);

  if (familyLoading && startDateLoading) return <div>가족 정보 Loading...</div>;
  if (!familyList) return <Navigate to={routes.family.entry} />;

  return (
    <div className="h-full w-full">
      <FamilyList familyList={familyList} />
      <Navbar />
      <ChallengeSection currentFamilySize={familyList.length} />
    </div>
  );
};

export default MainPage;

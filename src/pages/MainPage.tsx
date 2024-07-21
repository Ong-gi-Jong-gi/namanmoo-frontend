import QueryString from 'qs';
import { Suspense, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getFcmToken } from '../apis/auth/fcmToken';
import { useGetChallengeStartDate } from '../apis/challenge/getChallengeStartDate';
import { useGetMyFamilyInfo } from '../apis/family/getMyFamilyInfo';
import Loader from '../components/common/Loader';
import ChallengeSection from '../components/main/ChallengeSection';
import FamilyList from '../components/main/FamilyList';
import InviteModal from '../components/main/InviteModal';
import Navbar from '../components/main/Navbar';
import routes from '../constants/routes';
import useModalStore from '../store/modalStore';
import { messaging, onMessage } from '../utils/fcmSettings';

const MainPage = () => {
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const { data: familyList, isLoading: familyLoading } = useGetMyFamilyInfo();
  const { isLoading: startDateLoading } = useGetChallengeStartDate();
  const { openModal, isOpen } = useModalStore();
  const [fcm, setFcm] = useState<string>('');

  useEffect(() => {
    if (
      !isOpen &&
      !familyLoading &&
      familyList?.length === 1 &&
      queryData['code']
    ) {
      openModal({
        content: <InviteModal code={queryData['code'] as string} />,
        showCloseBtn: true,
      });
    }
  }, [familyLoading, familyList]);

  useEffect(() => {
    // Request permission and get token
    const requestPermission = async () => {
      try {
        const token = await getFcmToken();
        if (token) {
          console.log('FCM Token:', token);
          setFcm(token);
          // Send the token to your server and update the UI if necessary
        } else {
          console.log(
            'No registration token available. Request permission to generate one.',
          );
        }
      } catch (err) {
        console.error('An error occurred while retrieving token. ', err);
      }
    };

    // Listen for messages when the app is in the foreground
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      // Display the notification in the app UI
    });

    requestPermission();
  }, []);

  if (familyLoading || startDateLoading) return <div>가족 정보 Loading...</div>;
  if (!familyList) return <Navigate to={routes.family.entry} />;

  return (
    <Suspense fallback={<Loader />}>
      <div className="h-full w-full">
        <FamilyList familyList={familyList} />
        {fcm && <p>{fcm}</p>}
        <Navbar />
        <div className="grid h-full w-full grid-rows-[1fr_36%] items-end pt-32">
          <ChallengeSection currentFamilySize={familyList.length} />
        </div>
      </div>
    </Suspense>
  );
};

export default MainPage;

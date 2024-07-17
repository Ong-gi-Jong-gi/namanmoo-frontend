import QueryString from 'qs';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import FaceChallengeContainer from '../components/face-challenge/FaceChallengeContainer';
import GroupChallengeContainer from '../components/qa-challenge/GroupChallengeContainer';
import NormalChallengeContainer from '../components/qa-challenge/NormalChallengeContainer';
import PhotoChallengeContainer from '../components/qa-challenge/PhotoChallengeContainer';
import VoiceChallengeContainer from '../components/voicechallenge/VoiceChallengeContainer';

const ChallengeDetailPage = () => {
  const location = useLocation();

  const queryData = QueryString.parse(location.state, {
    ignoreQueryPrefix: true,
  }) as { type: string };

  const ChallengeContainer = () => {
    if (location.state.type == 'NORMAL') {
      return <NormalChallengeContainer />;
    } else if (location.state.type.includes('GROUP_')) {
      return <GroupChallengeContainer />;
    } else if (location.state.type == 'FACETIME') {
      return <FaceChallengeContainer />;
    } else if (location.state.type == 'PHOTO') {
      return <PhotoChallengeContainer />;
    } else if (queryData.type.includes('VOICE')) {
      return <VoiceChallengeContainer />;
    } else {
      return <Navigate to="/main" replace />;
    }
  };

  // const ChallengeContainer = () => {
  //   if (queryData.type == 'NORMAL') {
  //     return <NormalChallengeContainer />;
  //   } else if (queryData.type.includes('GROUP_')) {
  //     return <GroupChallengeContainer />;
  //   } else if (queryData.type == 'FACETIME') {
  //     return <FaceChallengeContainer />;
  //   } else if (queryData.type == 'PHOTO') {
  //     return <PhotoChallengeContainer />;
  //   } else if (queryData.type.includes('VOICE')) {
  //     return <VoiceChallengeContainer />;
  //   } else {
  //     return <Navigate to="/main" replace />;
  //   }
  // };

  return (
    <div className="h-full w-full">
      <Header />
      <ChallengeContainer />
    </div>
  );
};

export default ChallengeDetailPage;

import QueryString from 'qs';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../components/common/Header';
import FaceChallenge from '../components/face-challenge/FaceChallenge';
import FacetimeContainer from '../components/face-challenge/FacetimeContainer';
import GroupChallengeContainer from '../components/qa-challenge/GroupChallengeContainer';
import NormalChallengeContainer from '../components/qa-challenge/NormalChallengeContainer';
import PhotoChallengeContainer from '../components/qa-challenge/PhotoChallengeContainer';

const ChallengDetailPage = () => {
  const location = useLocation();

  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  }) as { type: string };

  // FIXME: URL 개선에 따른 로직 변화를 위해 주석처리
  // const ChallengeContainer = () => {
  //   if (location.state.type == 'NORMAL') {
  //     return <NormalChallengeContainer />;
  //   } else if (location.state.type.includes('GROUP_')) {
  //     return <GroupChallengeContainer />;
  //   } else if (location.state.type == 'FACETIME') {
  //     return <FacetimeContainer />;
  //   } else if (location.state.type == 'PHOTO') {
  //     return <PhotoChallengeContainer />;
  //   } else if (location.state.type == 'VOICE') {
  //     // return <VoiceChallengeContainer />;
  //     return <Navigate to="/main" replace />;
  //   } else {
  //     return <Navigate to="/main" replace />;
  //   }
  // };

  const ChallengeContainer = () => {
    if (queryData.type == 'NORMAL') {
      return <NormalChallengeContainer />;
    } else if (queryData.type.includes('GROUP_')) {
      return <GroupChallengeContainer />;
    } else if (queryData.type == 'FACETIME') {
      return <FaceChallenge />;
    } else if (queryData.type == 'PHOTO') {
      return <PhotoChallengeContainer />;
    } else if (queryData.type == 'VOICE') {
      // return <VoiceChallengeContainer />;
      return <Navigate to="/main" replace />;
    } else {
      return <Navigate to="/main" replace />;
    }
  };

  return (
    <div className="h-full w-full">
      <Header />
      <ChallengeContainer />
    </div>
  );
};

export default ChallengDetailPage;

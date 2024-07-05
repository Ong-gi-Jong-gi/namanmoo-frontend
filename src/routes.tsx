import { createBrowserRouter, RouteObject } from 'react-router-dom';
import DefaultLayout from './components/common/layouts/DefaultLayout';
import PrivateLayout from './components/common/layouts/PrivateLayout';
import routes from './constants/routes';
import ChallengDetailPage from './pages/ChallengDetailPage';
import ChallengeListPage from './pages/ChallengeListPage';
import FamilyCreatePage from './pages/FamilyCreatePage';
import FamilyEntryPage from './pages/FamilyEntryPage/FamilyEntryPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import MyPage from './pages/MyPage';
import RecapPage from './pages/RecapPage';
import SignupPage from './pages/SignupPage';

const privateChildren: RouteObject[] = [
  {
    // 메인 페이지
    path: routes.main,
    element: <MainPage />,
  },
  {
    // 가족 생성/참여 전 페이지
    path: routes.family.entry,
    element: <FamilyEntryPage />,
  },
  {
    // 가족 생성 페이지
    path: routes.family.create,
    element: <FamilyCreatePage />,
  },
  {
    // 챌린지 목록 페이지
    path: routes.challenge,
    element: <ChallengeListPage />,
  },
  {
    // 챌린지 상세/참여 페이지
    path: `${routes.challenge}/:challengeId`,
    element: <ChallengDetailPage />,
  },
  {
    // 마이 페이지
    path: routes.mypage,
    element: <MyPage />,
  },
  {
    // 리캡 페이지
    path: routes.recap,
    element: <RecapPage />,
  },
];

const router = createBrowserRouter([
  {
    path: '', // default route
    element: <DefaultLayout />,
    children: [
      {
        // 회원가입 페이지
        path: routes.signup,
        element: <SignupPage />,
      },
      {
        // 로그인 페이지
        path: routes.login,
        element: <LoginPage />,
      },
      {
        path: '', // 로그인 시에만 접근 가능한 페이지
        element: <PrivateLayout />,
        children: privateChildren,
      },
    ],
  },
]);

export default router;

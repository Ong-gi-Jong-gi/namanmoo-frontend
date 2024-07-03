import { createBrowserRouter, RouteObject } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import routes from './constants/routes';
import MainPage from './pages/MainPage';
import FamilyCreatePage from './pages/FamilyCreatePage';
import ChallengeListPage from './pages/ChallengeListPage';
import ChallengDetailPage from './pages/ChallengDetailPage';
import MyPage from './pages/MyPage';
import RecapPage from './pages/RecapPage';

const privateChildren: RouteObject[] = [
  {
    // 메인 페이지
    path: routes.main,
    element: <MainPage />,
  },
  {
    // 가족 생성 페이지
    path: `${routes.family}/${routes.create}`,
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

export const createRoute = () =>
  createBrowserRouter([
    {
      path: '', // default route
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
      ],
    },
    {
      path: '', // 로그인 시에만 접근 가능한 페이지
      element: <div>로그인 후 접근 가능한 페이지</div>, // TODO: PrivateLayout 컴포넌트 구현
      children: privateChildren,
    },
  ]);

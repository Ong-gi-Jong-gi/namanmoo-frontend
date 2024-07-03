const routes = {
  // Domain
  main: '/',
  signup: '/signup',
  login: '/login',
  challenge: '/challenge',
  family: {
    create: '/family/create',
  },
  mypage: '/mypage',
  recap: '/recap',
} as const;

export default routes;

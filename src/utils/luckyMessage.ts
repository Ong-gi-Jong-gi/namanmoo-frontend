import { LUCKY_MESSAGE } from '../constants/service';

export const getRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * 5) + 1;
  return LUCKY_MESSAGE[randomIndex];
};

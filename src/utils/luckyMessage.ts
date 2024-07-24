import { LUCKY_MESSAGE } from '../constants/service';

export const getRandomMessage = () => {
  const randomIndex =
    Math.floor(Math.random() * Object.keys(LUCKY_MESSAGE).length) + 1;
  return LUCKY_MESSAGE[randomIndex];
};

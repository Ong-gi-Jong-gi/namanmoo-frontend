import base64 from 'base-64';
import { TokenType } from '../types/token';
import { getCookie } from './cookie';

const parseJwtToken: (arg: string) => TokenType = (jwtToken: string) => {
  //jwt토큰 디코딩
  console.log(jwtToken);
  const payload = jwtToken.substring(
    jwtToken.indexOf('.') + 1,
    jwtToken.lastIndexOf('.'),
  );
  const decodingInfo = base64.decode(payload);
  const decodingInfoJson = JSON.parse(decodingInfo);

  return decodingInfoJson;
};

export const getExpireTime = (token: string) => {
  const parsedToken = parseJwtToken(token);

  return Math.round((parsedToken.exp * 1000 - new Date().getTime()) / 60000);
};

export const getUserId = () => {
  const jwtToken = getCookie('authorization');
  const parsedToken = parseJwtToken(jwtToken);

  return parsedToken.loginId;
};

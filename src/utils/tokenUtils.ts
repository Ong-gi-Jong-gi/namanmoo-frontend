import base64 from 'base-64';
import { TokenType } from '../types/token';
import { getCookie } from './cookie';

const parseJwtToken: (arg: string) => TokenType = (jwtToken: string) => {
  //jwt토큰 디코딩
  const payload = jwtToken.substring(
    jwtToken.indexOf('.') + 1,
    jwtToken.lastIndexOf('.'),
  );
  const decodingInfo = base64.decode(payload);
  const decodingInfoJson = JSON.parse(decodingInfo);

  return decodingInfoJson;
};

// FIXME: Token 개선 이후 사용 예정
export const getExpireTime = () => {
  const jwtToken = getCookie('authorization');
  const parsedToken = parseJwtToken(jwtToken);

  return (parsedToken.exp - new Date().getTime()) / 60000;
};

export const getUserId = () => {
  const jwtToken = getCookie('authorization');
  const parsedToken = parseJwtToken(jwtToken);

  return parsedToken.loginId;
};

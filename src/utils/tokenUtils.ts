import base64 from 'base-64';
import { TokenType } from '../types/token';

// FIXME: Token 개선 이후 사용 예정

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

export const getExpireTime = (jwtToken: string) => {
  const parsedToken = parseJwtToken(jwtToken);

  console.log(new Date(parsedToken.exp));
  console.log(new Date());

  return (parsedToken.exp - new Date().getTime()) / 60000;
};

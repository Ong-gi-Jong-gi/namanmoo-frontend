import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = <T>(name: string, value: T, options = {}) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const deleteCookie = (name: string) => {
  cookies.remove(name);
};

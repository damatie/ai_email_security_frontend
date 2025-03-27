import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
}

function useCookie(name: string) {
  const [cookieValue, setCookieValue] = useState(() => Cookies.get(name));

  const updateCookie = useCallback(() => {
    setCookieValue(Cookies.get(name));
  }, [name]);

  useEffect(() => {
    updateCookie();
  }, [name, updateCookie]);

  const getCookie = (cookieName: string) => Cookies.get(cookieName);

  const setCookie = (value: string, options?: CookieOptions) => {
    Cookies.set(name, value, options);
    updateCookie();
  };

  const removeCookie = (options?: Pick<CookieOptions, 'path'>) => {
    Cookies.remove(name, options);
    updateCookie();
  };

  return {
    value: cookieValue,
    get: getCookie,
    set: setCookie,
    remove: removeCookie,
  };
}

export default useCookie;

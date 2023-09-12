import { useState, createContext } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import siteRoutes from '../constants/routes';
import ScreenLoading from '../components/screen-loading';

const UserContext = createContext();

const UserProvider = (props) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [cookies, removeCookie] = useCookies(['cookie-name']);
  const [, setCookie] = useCookies(['cookie-name']);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (cookies && cookies['wex-user']) {
      if (hasExpired(cookies['wex-user'].expires)) {
        logout();
      } else {
        setUser({
          ...user,
          accessToken: cookies['wex-user'].accessToken,
          expires: cookies['wex-user'].expires
        });
      }
    }
    setIsLoadingUser(false);
  }, []);

  const setUserEmail = (email) => {
    setUser({ ...user, email });
  };

  const setPasscode = (passcode) => {
    setUser({ ...user, passcode });
  };

  const setAccessToken = (accessToken, expires) => {
    setUser({
      ...user,
      accessToken: accessToken,
      expires: expires
    });
    setCookie('wex-user', { accessToken, expires }, { path: '/' }, expires);
  };

  const clearCookie = () => {
    removeCookie('wex-user', '', { path: '/' });
  };

  const logout = () => {
    removeCookie('wex-user', '', { path: '/' });
    setUser({});
    router.push({
      pathname: siteRoutes.HOME_PAGE
    });
  };

  const hasExpired = (expireTime) => {
    return expireTime < new Date().getTime();
  };

  if (isLoadingUser) {
    return <ScreenLoading />;
  }

  return (
    <UserContext.Provider
      value={{ user, logout, setUserEmail, setPasscode, setAccessToken, clearCookie }}
      {...props}
    />
  );
};

export { UserProvider, UserContext };

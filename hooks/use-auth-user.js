import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import useUser from './use-user';

const useAuthenticatedUser = () => {
  const [cookies] = useCookies(['cookie-name']);
  const { setAccessToken } = useUser();

  useEffect(() => {
    if (cookies && cookies['wex-user']) {
      setAccessToken(cookies['wex-user']);
    }
  }, []);
};

export default useAuthenticatedUser;

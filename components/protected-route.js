import { useState, useEffect } from 'react';
import siteRoutes from '../constants/routes';
import useUser from '../hooks/use-user';
import ScreenLoading from '../components/screen-loading';

const isBrowser = () => typeof window !== 'undefined';

const ProtectedRoute = ({ router, children }) => {
  const protectedRoutes = [siteRoutes.MANAGE_ACCOUNT_PAGE];

  const pathIsProtected = protectedRoutes.find((route) => route === router.pathname);
  const pathIsLogin = router.pathname === siteRoutes.LOGIN_PAGE;
  const [isLoading, setIsLoading] = useState(true);
  const { user, isLoadingUser } = useUser();

  useEffect(() => {
    if (router.isReady && isBrowser() && !isLoadingUser) {
      if (pathIsProtected && !user.accessToken) {
        router.push({
          pathname: siteRoutes.LOGIN_PAGE
        });
      } else {
        if (pathIsLogin && user && user.accessToken) {
          router.push({
            pathname: siteRoutes.MANAGE_ACCOUNT_PAGE
          });
        } else {
          setIsLoading(false);
        }
      }
    }
  }, [router.isReady, router.pathname, isLoadingUser]);

  if (isLoading) {
    return <ScreenLoading />;
  }

  return children;
};

export default ProtectedRoute;

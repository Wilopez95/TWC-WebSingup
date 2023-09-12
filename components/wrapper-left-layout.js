import siteRoutes from '../constants/routes';
import { useEffect, useState } from 'react';
import router from 'next/router';

const WrapperLeftLayout = ({ children }) => {
  const noLeftLayoutRoutes = [siteRoutes.HOME_PAGE];
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (noLeftLayoutRoutes.find((route) => route === router.pathname)) {
        setDisplay(true);
      }
    }
  }, [router.isReady]);

  return (
    <>
      <div className={!display ? 'layout' : ' '}>
        <div className={!display ? 'layout--left' : ''}>{children}</div>
      </div>
    </>
  );
};

export default WrapperLeftLayout;

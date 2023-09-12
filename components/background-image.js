import Picture from './picture';
import getConfiguration from '../hooks/components/get-configuration';
import siteRoutes from '../constants/routes';
import router from 'next/router';
import { useEffect, useState } from 'react';

const BackgroundImage = () => {
  const noBackgroundRoutes = [
    siteRoutes.HOME_PAGE,
    siteRoutes.MANAGE_ACCOUNT_PAGE,
    siteRoutes.HELP_PAGE,
    siteRoutes.LEGAL_PAGE
  ];

  const { configurationData, isLoading, error } = getConfiguration();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      if (!noBackgroundRoutes.find((route) => route === router.pathname)) {
        setDisplay(true);
      } else {
        setDisplay(false);
      }
    }
  }, [router.isReady, router.pathname]);

  if (isLoading || !display) {
    return <></>;
  }

  const backgroundImage = {
    imgMobile: {
      src: error ? '/images/background.jpeg' : configurationData.dsp.web.wallpaper,
      alt: 'alt'
    }
  };

  return (
    <Picture
      modifier={'background-image__image'}
      imageModifier={'background-image__picture'}
      images={backgroundImage}
    />
  );
};
export default BackgroundImage;

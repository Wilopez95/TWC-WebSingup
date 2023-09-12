import Picture from './picture';
import WeatherImageSkeleton from './skeletons/weather-image-skeleton';
import getConfiguration from '../hooks/components/get-configuration';
import siteRoutes from '../constants/routes';

const WeatherImage = ({ smallLogo = false }) => {
  const { configurationData, isLoading, error } = getConfiguration();

  if (isLoading) {
    return <WeatherImageSkeleton />;
  }

  const weatherImage = {
    imgMobile: {
      src: error ? '/images/Logo TWC white.png' : configurationData.general.logoOverride,
      alt: 'alt'
    }
  };

  return (
    <a
      className={`weather-image__button ${
        !siteRoutes.HOME_PAGE && 'weather-image__button-disable'
      }`}
      href="/"
      aria-label={'Back to the landing page'}
      disable="false"
    >
      <Picture
        modifier="weather-image__image"
        imageModifier={` ${
          smallLogo ? 'weather-image__small-picture ' : 'weather-image__picture'
        } `}
        images={weatherImage}
      />
    </a>
  );
};
export default WeatherImage;

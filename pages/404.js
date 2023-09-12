import WeatherImage from '../components/weather-image';
import Button from '../components/button';
import Svg from '../components/svg';
export default function Custom404() {
  return (
    <div className="custom404">
      <WeatherImage />
      <div className="custom404__icon-container">
        <Svg icon="error-alert-white" modifier="custom404__icon-container--icon" />
      </div>
      <h1 className="custom404__title">Whoops! This isn’t the right page.</h1>
      <h2 className="custom404__subtitle">We couldn’t find the page you were looking for.</h2>
      <Button
        modifier={'custom404__button'}
        target=""
        url="/"
        aria-label="Back to the last page they were viewing before the error occurred."
        text={'Go Back'}
      />
    </div>
  );
}

import Svg from './svg';

export default function AvailableDevices({ showText = true }) {
  return (
    <div
      className="devices"
      tabIndex={0}
      aria-label="The Weather Channel Subscription works on TVs only."
    >
      {showText && (
        <p className="devices__text">
          These plans do not include access to weather.com website or mobile app Premium
          Subscriptions.
        </p>
      )}
      <div className="devices__container">
        <Svg icon="tv" modifier="devices--image devices__icon--tv" />
        <Svg icon="pc" modifier="devices--image devices__icon--pc" />
        <Svg icon="phone" modifier="devices--image devices__icon--phone" />
      </div>
    </div>
  );
}

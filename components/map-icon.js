import Svg from './svg';

const MapIcon = ({ icon, label }) => {
  return (
    <div className="icon-map" aria-label={label}>
      <Svg icon={icon} modifier="icon-map__icon" />
      <p className="icon-map__text">{label}</p>
    </div>
  );
};

export default MapIcon;

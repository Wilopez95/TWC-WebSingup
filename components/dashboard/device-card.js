import Card from '../card';

const DeviceCard = ({ type }) => {
  return (
    <Card modifier="roku-card__card-group">
      <div className="roku-card__container-card__content">
        <p className="roku-card__container-card__title">{type}</p>
      </div>
      <p className="roku-card__container-card__text">
        You can make changes to or manage your account on your {type} device.
      </p>
      <p className="roku-card__container-card__text-assistance">
        If you need more assistance, please visit our{' '}
        <a className="roku-card__container-card__text-assistance--link" href="/">
          help section.
        </a>
      </p>
    </Card>
  );
};

export default DeviceCard;

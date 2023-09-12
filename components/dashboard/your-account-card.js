import Card from '../card';

const YourAccountCard = ({ emailAccount }) => {
  return (
    <Card
      modifier="your-account-card__card-group"
      ariaLabel="This Email is registered to your Weather Channel Account"
      tabIndex={0}
    >
      <p className="your-account-card__container-card__title">Your Account</p>
      <p className="your-account-card__container-card__text">Email</p>
      <p className="your-account-card__container-card__text__space-top">{emailAccount}</p>
    </Card>
  );
};

export default YourAccountCard;

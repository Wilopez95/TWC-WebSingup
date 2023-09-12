import PropTypes from 'prop-types';
import Modal from './modal';
import Button from './button';
import { cardType } from '../helpers/credit-card-validation';
import Svg from './svg';

const SubscriptionModal = ({
  isOpen,
  onClose,
  changeStep,
  subscriptionData,
  isLoading,
  isModal,
  configData
}) => {
  SubscriptionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isModal: PropTypes.bool
  };

  const onPressContinue = () => {
    if (isModal) {
      changeStep();
    } else {
      onClose();
      changeStep();
    }
  };

  const setAmount = (amount, plan) => {
    if (amount === '0.00') {
      if (plan === 'Annual') {
        return configData.yearlyCost;
      } else {
        return configData.monthlyCost;
      }
    } else {
      return '$' + amount;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} help={true} legal={true}>
      <div className="subscription-modal">
        <h2 className="subscription-modal__title">Review & Complete</h2>
        <p className="subscription-modal__plan-status">New Plan</p>
        <div className="subscription-modal__plan">
          <p className="subscription-modal__plan__type">{subscriptionData.type}</p>
          <div>
            <label>
              {isModal
                ? setAmount(subscriptionData.price, subscriptionData.type)
                : subscriptionData.price}
            </label>
            <label className="subscription-modal__plan__tax">{`${
              subscriptionData.type === 'Annual' ? '/ yr' : '/ mo'
            } + applicable tax`}</label>
          </div>
        </div>
        <p className="subscription-modal__plan-cycle">
          Charges auto-renew at end of billing cycle.
        </p>
        <div className="subscription-modal__card">
          <Svg
            icon={cardType(subscriptionData.cardNumber)}
            modifier="subscription-modal__card__icon"
          />
          <label className="subscription-modal__card__number">{`•••• •••• •••• ${subscriptionData.lastDigits}`}</label>
        </div>
        <p className="subscription-modal__subscription-date">
          {`Your new subscription to The Weather Channel will begin ${
            !subscriptionData.nextPayment ? 'immediately' : 'on ' + subscriptionData.nextPayment
          }.`}
        </p>
        <div className="subscription-modal__button-container">
          <Button
            text={'Cancel'}
            color="white"
            modifier="subscription-modal__button-container__button--cancel"
            ariaLabel="Click Cancel to return to the Billing information page. "
            clickEvent={onClose}
          />
          <Button
            isLoading={isLoading}
            text={'COMPLETE SUBSCRIPTION'}
            modifier="subscription-modal__button-container__button--confirm"
            clickEvent={() => onPressContinue()}
            ariaLabel="Click on complete subscription if all the information is correct to start watching The Weather Channel."
          />
        </div>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;

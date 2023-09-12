import PropTypes from 'prop-types';
import Modal from './modal';
import Button from './button';
import Svg from './svg';
import { useState } from 'react';
import cancelSubscription from '../hooks/components/cancel-subscription';
import useWindowDimensions from '../helpers/window.dimensions';

const CancelSubscriptionModal = ({
  data,
  setSubscriptionData,
  isOpen,
  onClose,
  openChangePlan
}) => {
  const { isMobile } = useWindowDimensions();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelDate, setCancelDate] = useState('');

  const { cancel } = cancelSubscription(
    (response) => {
      if (!response.success) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setSubscriptionData({
          ...data,
          plan: { ...data.plan, cancelSubscription: response.subscription.cancel_at_end_of_period }
        }),
          setCancelDate(
            new Date(response.subscription.scheduled_cancellation_at).toLocaleDateString('en-US')
          );
        setSuccess(true);
      }
    },
    (error) => {
      error.message = 'fatal';
      setIsLoading(false);
    }
  );

  CancelSubscriptionModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
  };

  const buttonNeverMind = () => {
    return (
      <Button
        text={'NEVER MIND'}
        color="white"
        modifier="cancel-subscription__buttons--button"
        clickEvent={onClose}
        ariaLabel="Click Never mind to return to the My Account Dashboard"
      />
    );
  };

  const buttonCancelSubscription = () => {
    return (
      <Button
        isLoading={isLoading}
        text={'CANCEL SUBSCRIPTION'}
        modifier="cancel-subscription__buttons--button"
        clickEvent={() => {
          setIsLoading(true);
          cancel();
        }}
        ariaLabel="Click the Cancel Subscription button to confirm your cancelation."
      />
    );
  };

  const cancelModal = () => {
    return (
      <div className="cancel-subscription">
        <div className="cancel-subscription__logo">
          <Svg icon={'error-alert-triangle'} modifier="cancel-subscription__logo__icon" />
        </div>
        <p className="cancel-subscription__title">Cancel Your Subscription</p>
        <p className="cancel-subscription__subtitle ">Are you sure you want to cancel?</p>
        <div className="cancel-subscription__change-plan">
          <p className="cancel-subscription--regular-text">
            If you want to change your plan,{' '}
            <button
              className="cancel-subscription__change-plan--click-here-button"
              onClick={openChangePlan}
              aria-label="If you want to change your plan instead of cancelling, click the click here hypertext to go navigate to the change plan screen."
            >
              click here
            </button>
          </p>
        </div>
        <div className="cancel-subscription__line"></div>
        <p className="cancel-subscription--regular-text cancel-subscription__body">
          You’ll miss out on Live weather coverage 24/7, local forecasts, alerts, interactive radar,
          maps and shows on-demand.{<br />} + Exclusive new features are always being added.
        </p>
        <p className="cancel-subscription--regular-text cancel-subscription__body">
          Thank you for trusting The Weather Channel.
        </p>
        <div className="cancel-subscription__buttons">
          {isMobile ? buttonCancelSubscription() : buttonNeverMind()}
          {isMobile ? buttonNeverMind() : buttonCancelSubscription()}
        </div>
      </div>
    );
  };

  const successModal = () => {
    return (
      <div className="cancel-subscription">
        <div className="cancel-subscription__logo">
          <Svg icon={'success'} modifier="cancel-subscription__logo__icon" />
        </div>
        <p className="cancel-subscription__title cancel-subscription__title--success">
          Your Subscription is Cancelled
        </p>
        <div className="cancel-subscription__line"></div>
        <p className="cancel-subscription--regular-text cancel-subscription__body cancel-subscription__body--success">
          {`Your subscription to The Weather Channel has been cancelled as of ${cancelDate}.`}
          {<br />}
          {`You can still access The Weather Channel (${data.plan.type}) until the end of the current billing
          cycle.`}
        </p>
        <p className="cancel-subscription--regular-text cancel-subscription__body">
          Thank you for trusting The Weather Channel.
        </p>
        <div className="cancel-subscription--close">
          <Button
            text={'CLOSE'}
            modifier="cancel-subscription--close--button"
            clickEvent={onClose}
            ariaLabel="Click Close to return to the My Account Dashboard"
          />
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} help={true} legal={true}>
      {!success ? cancelModal() : successModal()}
    </Modal>
  );
};

export default CancelSubscriptionModal;

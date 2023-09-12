import { React, useEffect, useState } from 'react';
import Modal from '../modal';
import PropTypes from 'prop-types';
import Button from '../button';
import Svg from '../svg';
import updatePlan from '../../hooks/components/update-plan';
import useWindowDimensions from '../../helpers/window.dimensions';

const ChangePlanModal = ({
  isOpen,
  onClose,
  data,
  configData,
  subscriptionsData,
  setSubscriptionData,
  showError
}) => {
  const { isDesktop } = useWindowDimensions();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [newPlanData, setNewPlanData] = useState({});
  ChangePlanModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  useEffect(() => {
    if (data) {
      if (data.plan.type === 'Annual') {
        setNewPlanData({
          newPlan: 'Monthly',
          actualPlan: 'Annual',
          newAmount: configData.monthlyCost,
          newPrefix: '/ mo',
          newPaymentDate: ' per month',
          newPlanID: getSubscriptionID('Monthly')
        });
      } else {
        setNewPlanData({
          newPlan: 'Annual',
          actualPlan: 'Monthly',
          newAmount: configData.yearlyCost,
          newPrefix: '/ yr',
          newPaymentDate: ' per year',
          newPlanID: getSubscriptionID('Annual')
        });
      }
    }
  }, [data]);

  const getSubscriptionID = (name) => {
    if (subscriptionsData) {
      for (let i = 0; i < subscriptionsData.length; i++) {
        if (subscriptionsData[i].name === name) {
          return subscriptionsData[i].id;
        }
      }
    }
  };

  const { update } = updatePlan(newPlanData.newPlanID, (response) => {
    if (!response.success) {
      setIsLoading(false);
      showError(response);
    } else {
      setIsLoading(false);
      setResponseData(response.data);

      changeScreen();
    }
  });

  const PressUpdatePlan = () => {
    if (step === 1) {
      setIsLoading(true);
      update();
    } else {
      changeScreen();
    }
  };

  const changeScreen = () => {
    setStep(step + 1);
  };

  const cancelOption = () => {
    setStep(0);
    setSubscriptionData({
      ...data,
      billing: {
        ...data.billing,
        nextPayment: new Date(responseData.current_period_ends_at).toLocaleDateString('en-US')
      },
      plan: {
        ...data.plan,
        price: (responseData.product_price_in_cents / 100).toFixed(2),
        state: responseData.state,
        type: responseData.product.name === 'TWC2999Yearly' ? 'Annual' : 'Monthly'
      }
    });
    onClose();
  };

  const onPressClose = () => {
    setStep(0);
    onClose();
  };

  const buttonNeverMind = () => {
    return (
      <Button
        text="NEVER MIND"
        color="white"
        modifier="modal-container__new-plan-content__container-button__button"
        clickEvent={onPressClose}
        ariaLabel="Click Never mind to return to the My Account Dashboard"
      />
    );
  };

  const buttonContinue = () => {
    return (
      <Button
        isLoading={isLoading}
        modifier="modal-container__new-plan-content__container-button__button__right"
        text={step === 0 ? 'CONTINUE' : 'CHANGE PLAN'}
        clickEvent={() => PressUpdatePlan()}
        ariaLabel={
          step === 0
            ? 'Click Continue to change your plan.'
            : 'Clicking on Change Plan button confirms the plan changes.'
        }
      />
    );
  };

  const successScreen = () => {
    return (
      <div className="modal-container">
        <div className="modal-container__success">
          <Svg icon="success" modifier={`modal-container__success__icon`} />
        </div>
        <p className="modal-container__title-success">Your Plan Has Been Updated</p>

        <div className="modal-container__new-plan-content">
          <p className="modal-container__new-plan-content__text">New Plan </p>
          <div className="modal-container__new-plan-content__detail">
            <p className="modal-container__new-plan-content__detail__type-plan">
              {newPlanData.newPlan}
            </p>

            <p className="modal-container__new-plan-content__detail__type-plan">
              {newPlanData.newAmount}{' '}
              <span className="modal-container__new-plan-content__detail__condition-price">
                {newPlanData.newPrefix} + applicable tax
              </span>
            </p>
          </div>
          <p className="modal-container__new-plan-content__conditions">
            Charges auto-renew at end of billing cycle.
          </p>
          <div className="modal-container__new-plan-content__subcription-container">
            <p className="modal-container__new-plan-content__subcription-container__text">
              Your current plan will expire on {data.billing.nextPayment}.
            </p>
            <p className="modal-container__new-plan-content__subcription-container__text">
              Your new subscription will begin on {data.billing.nextPayment}.
            </p>
          </div>
          <div className="modal-container__new-plan-content__container-success-button">
            <Button
              text="CLOSE"
              clickEvent={cancelOption}
              ariaLabel="Your new subscription to The Weather Channel will begin on "
              {...data.billing.nextPayment}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} help={step <= 1 ? true : false} legal={true}>
      {step <= 1 ? (
        <div className="modal-container">
          <p className="modal-container__title">
            {step === 0 ? 'Change Plan' : 'Confirm New Plan'}
          </p>

          <div className="modal-container__new-plan-content">
            <p className="modal-container__new-plan-content__text">New Plan </p>

            <div
              className="modal-container__new-plan-content__detail"
              tabIndex={0}
              aria-label={
                'Your New plan will be the ' +
                newPlanData.planType +
                ' plan at ' +
                newPlanData.newAmount +
                newPlanData.newPaymentDate +
                ' + applicable tax'
              }
            >
              <p className="modal-container__new-plan-content__detail__type-plan">
                {newPlanData.newPlan}
              </p>

              <p className="modal-container__new-plan-content__detail__type-plan">
                {newPlanData.newAmount}{' '}
                <span className="modal-container__new-plan-content__detail__condition-price">
                  {newPlanData.newPrefix} + applicable tax
                </span>
              </p>
            </div>
            <p className="modal-container__new-plan-content__conditions">
              Charges auto-renew at end of billing cycle.
            </p>

            {step === 1 && (
              <div
                className="modal-container__new-plan-content__subcription-container"
                tabIndex={0}
                aria-label="Your new subscription to the Weather Channel will begin on (date). You can still access the Weather Channel Monthly until the end of the current billing cycle"
              >
                <p className="modal-container__new-plan-content__subcription-container__text">
                  Your new subscription to The Weather Channel will begin on{' '}
                  {data.billing.nextPayment}.
                </p>

                <p className="modal-container__new-plan-content__subcription-container__text-second">
                  You can still access The Weather Channel ({newPlanData.actualPlan}) until the end
                  of the current billing cycle.
                </p>
              </div>
            )}
            <div className="modal-container__new-plan-content__container-button">
              {isDesktop ? buttonNeverMind() : buttonContinue()}
              {isDesktop ? buttonContinue() : buttonNeverMind()}
            </div>
          </div>
        </div>
      ) : (
        successScreen()
      )}
    </Modal>
  );
};
export default ChangePlanModal;

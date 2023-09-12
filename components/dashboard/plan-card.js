import { useState } from 'react';
import Card from '../card';
import ChangePlanModal from './change-plan-modal';
import CancelSubscriptionModal from '../cancel-subscription-modal';
import ErrorModal from '../error-modal';

const PlanCard = ({ data, setSubscriptionData, configData, subscriptionsData }) => {
  const [changePlanModal, setChangePlanModal] = useState(false);
  const openPlanModal = () => setChangePlanModal(!changePlanModal);
  const [cancelSubscriptionModal, setCancelSubscriptionModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const toggleError = () => setShowErrorModal(!showErrorModal);
  const cancelSubscription = () => setCancelSubscriptionModal(!cancelSubscriptionModal);

  const planInfo = data.plan.type + ' ' + `$${data.plan.price}`;

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

  const showError = (error) => {
    const { message } = error;
    setErrorMessage(message);
    toggleError();
  };

  const tryAgainButtonAction = () => {
    toggleError();
    openPlanModal();
  };

  return (
    <div>
      <Card
        modifier="plan-card__card-group"
        ariaLabel={'Your current plan is ' + planInfo}
        tabIndex={0}
      >
        <div className="plan-card__container-card__content">
          <p className="plan-card__container-card__title">Plan</p>
          <button
            onClick={openPlanModal}
            className="plan-card__container-card__link"
            aria-label="Click Change Plan to navigate to the change page."
          >
            Change Plan
          </button>
        </div>

        <div className="plan-card__container-card__content">
          <p className="plan-card__container-card__content__plan">{data.plan.type}</p>
          <p className="plan-card__container-card__content__plan">
            {setAmount(data.plan.price, data.plan.type)}
            <span className="plan-card__container-card__content__text">
              {data.plan.type === 'Annual' ? '/yr' : '/mo'}
            </span>
          </p>
        </div>

        <div className="plan-card__line"></div>

        <div className="plan-card__container-card__content">
          <p className="plan-card__container-card__text">Cancel subscription</p>
          <button
            onClick={cancelSubscription}
            disabled={data.plan.cancelSubscription}
            className={
              data.plan.cancelSubscription
                ? 'plan-card__container-card__cancel-link-disable'
                : 'plan-card__container-card__cancel-link'
            }
            aria-label="Click here to cancel your subscription."
          >
            Cancel
          </button>
        </div>
      </Card>

      <ChangePlanModal
        isOpen={changePlanModal}
        onClose={openPlanModal}
        data={data}
        configData={configData}
        subscriptionsData={subscriptionsData}
        setSubscriptionData={setSubscriptionData}
        showError={showError}
      />
      <CancelSubscriptionModal
        data={data}
        setSubscriptionData={setSubscriptionData}
        isOpen={cancelSubscriptionModal}
        onClose={() => cancelSubscription()}
        openChangePlan={() => {
          cancelSubscription(), openPlanModal();
        }}
      />
      <ErrorModal
        onClose={() => toggleError()}
        isOpen={showErrorModal}
        errorMessage={errorMessage}
        showHelp={true}
        action={tryAgainButtonAction}
      />
    </div>
  );
};

export default PlanCard;

import { React, useState, useEffect } from 'react';
import getHistorySubscription from '../../hooks/components/get-history-subscription';
import Card from '../card';
import Svg from '../svg';
import UpdatePaymentDetail from '../update-payment-detail-modal';
import ChargeModal from './charge-modal';

const BillingCard = ({ subscriptionData, setSubscriptionData, configData }) => {
  const [chargeModal, setChargeModal] = useState(false);
  const openModal = () => setChargeModal(!chargeModal);
  const [updatePaymentModal, setUpdatePaymentModal] = useState(false);
  const updatePayment = () => setUpdatePaymentModal(!updatePaymentModal);
  const { history } = getHistorySubscription();
  const billingInfo =
    subscriptionData.billing.nextPayment + '. For ' + subscriptionData.billing.pricePlan;

  useEffect(() => {
    if (history) {
      setSubscriptionData({ ...subscriptionData, history });

      if (!subscriptionData.paymentDetail) {
        updatePayment();
      }
    }
  }, [history]);

  const getTypeCard = (card) => {
    switch (card) {
      case 'american_express':
        return card;

      case 'visa':
        return card;

      case 'master':
        return card;

      default:
        return 'generic';
    }
  };

  return (
    <>
      <Card modifier="billing-card__card-group">
        <p className="billing-card__container-card__title">Billing</p>
        <div tabIndex={0} aria-label={'Your next bill payment will be ' + billingInfo}>
          <p className="billing-card__container-card__text__space-bottom">
            {subscriptionData.plan.cancelSubscription
              ? 'Your account will be active until '
              : 'Next Payment on '}
            {subscriptionData.billing.nextPayment}
          </p>
        </div>

        <p className="billing-card__container-card__content__plan__left">
          ${subscriptionData.plan.price}
          <span className="billing-card__container-card__content__text">+ Required Tax</span>
        </p>

        <div className="billing-card__container-card__content">
          <p className="billing-card__container-card__text__space-extra-top">Billing History</p>
          <button
            onClick={openModal}
            className="billing-card__container-card__cancel-link  billing-card__container-card__text__space-extra-top"
            aria-label=" Click on View changes to view billing history."
          >
            View Charges
          </button>
        </div>

        <div>
          <p className="billing-card__container-card__text__space-top billing-card__medium">
            {subscriptionData.plan.state === 'trialing'
              ? `Your trial will end on ${subscriptionData.billing.nextPayment}`
              : `Last payment made on ${subscriptionData.billing.lastPayment}`}
          </p>
        </div>

        <div className="billing-card__line"></div>

        <div className="billing-card__container-card__content">
          <p className="billing-card__container-card__text__space-bottom">Payment Details</p>
          <button
            className="billing-card__container-card__cancel-link  billing-card__container-card__text__space-bottom"
            onClick={updatePayment}
            aria-label="Click on Update to revise your payment details."
          >
            Update
          </button>
        </div>

        {!subscriptionData.paymentDetail ? (
          <UpdatePaymentDetail
            isOpen={updatePaymentModal}
            onClose={() => updatePayment()}
            data={subscriptionData}
            planType={subscriptionData.plan.type}
            nextPayment={subscriptionData.billing.nextPayment}
            price={subscriptionData.plan.price}
            setData={setSubscriptionData}
            configData={configData}
          />
        ) : (
          <div className="billing-card__card">
            <Svg
              icon={getTypeCard(subscriptionData.paymentDetail.cardType)}
              modifier="billing-card__card__icon"
            />
            <p className="billing-card__card__number">
              {subscriptionData.paymentDetail.cardNumber}
            </p>
          </div>
        )}
      </Card>
      <ChargeModal
        isOpen={chargeModal}
        onClose={openModal}
        historyData={subscriptionData.history ? subscriptionData.history : []}
      />
      <UpdatePaymentDetail
        isOpen={updatePaymentModal}
        onClose={() => updatePayment()}
        data={subscriptionData}
        planType={subscriptionData.plan.type}
        nextPayment={subscriptionData.billing.nextPayment}
        price={subscriptionData.plan.price}
        setData={setSubscriptionData}
        configData={configData}
      />
    </>
  );
};

export default BillingCard;

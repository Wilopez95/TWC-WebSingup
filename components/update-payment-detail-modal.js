import PropTypes from 'prop-types';
import Modal from './modal';
import Button from './button';
import Svg from './svg';
import { useState } from 'react';
import BillingForm from './signup-flow/billing-form';
import updateBillingInformation from '../hooks/components/update-billing-information';
import useWindowDimensions from '../helpers/window.dimensions';

const UpdatePaymentDetail = ({
  isOpen,
  onClose,
  data,
  planType,
  nextPayment,
  price,
  setData,
  configData
}) => {
  const { isDesktop } = useWindowDimensions();
  const [subscription, setSubscription] = useState({
    type: planType,
    nextPayment: nextPayment,
    price: price
  });
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  UpdatePaymentDetail.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object,
    planType: PropTypes.string,
    nextPayment: PropTypes.string,
    price: PropTypes.string
  };
  const [step, setStep] = useState(0);
  const [help, setHelp] = useState(true);

  const { update } = updateBillingInformation(
    (response) => {
      if (!response.success) {
        setShowError(true);
        setIsLoading(false);
        setHelp(true);
        changeStep();
      } else {
        setPaymentProfile(response.subscriptions.payment_profile);
        setShowError(false);
        setIsLoading(false);
        changeStep();
        setHelp(false);
      }
    },
    (error) => {
      error.message = 'fatal';
      setShowError(false);
      setIsLoading(false);
      setHelp(true);
      changeStep();
    }
  );

  const setPaymentProfile = (newData) => {
    const newPaymentDetail = {
      ...data,
      paymentDetail: {
        ...data.paymentDetail,
        cardNumber: newData.masked_card_number.replaceAll('X', '•').replaceAll('-', ' '),
        cardType: newData.card_type,
        customerAddress: {
          billing_address: newData.billing_address,
          billing_address_2: newData.billing_address_2,
          billing_city: newData.billing_city,
          billing_zip: newData.billing_zip
        },
        customerNames: {
          first_name: newData.first_name,
          last_name: newData.last_name
        }
      }
    };
    setData(newPaymentDetail);
  };

  const paymentDataFormat = (data) => {
    const res = {
      first_name: data.cardFirstName,
      last_name: data.cardLastName,
      card_number: data.cardNumber,
      exp_month: data.expirationMonthDate,
      exp_year: data.expirationYearDate,
      cvv: data.securityCode,
      billing_address: data.address,
      billing_address_2: data.address2,
      billing_city: data.city,
      billing_state: data.state,
      billing_zip: data.zipCode,
      billing_country: 'US'
    };
    return res;
  };

  const changeStep = () => {
    if (step < 1) {
      setStep(step + 1);
    }
  };

  const onPressComplete = () => {
    if (subscription) {
      setIsLoading(true);
      update(paymentDataFormat(subscription));
    }
  };

  const onCloseModal = () => {
    setStep(0);
    setHelp(true);
    onClose();
  };

  const setSubscriptionData = (data) => {
    const temp = {
      ...subscription,
      ...data
    };
    setSubscription(temp);
  };

  const updatePaymentForm = () => {
    return (
      <BillingForm
        isModal={true}
        modifier={'update-payment--modifier'}
        onCloseModal={onClose}
        update={update}
        changeStep={onPressComplete}
        subscriptionData={subscription}
        initialData={data.paymentDetail}
        setSubscriptionData={setSubscriptionData}
        isLoading={isLoading}
        configData={configData}
      />
    );
  };

  const buttonCancel = () => {
    return (
      <Button
        text={'CANCEL'}
        color="white"
        modifier="update-payment__status--buttons__button"
        clickEvent={() => onCloseModal()}
      />
    );
  };

  const buttonTryAgain = () => {
    return (
      <Button
        isLoading={isLoading}
        text={'TRY AGAIN'}
        modifier="update-payment__status--buttons__button"
        clickEvent={() => onPressComplete()}
      />
    );
  };

  const failedStatus = () => {
    return (
      <div className="update-payment__status">
        <Svg icon="error-alert-black" modifier={`update-payment__status__icon`} />
        <div
          tabIndex={0}
          aria-label="Uh Oh, that didn’t go as planned. Your card was not authorized, Please check the credit card information or choose a different credit card and try again."
        >
          <p className="update-payment__status__title">That Didn’t Go As Planned.</p>
          <p className="update-payment__status__body">Your card was not authorized.</p>
          <p className="update-payment__status__body">
            Please check your credit card information or choose a different card and try again.
          </p>
        </div>

        <div className="update-payment__status--buttons">
          {isDesktop ? buttonCancel() : buttonTryAgain()}
          {isDesktop ? buttonTryAgain() : buttonCancel()}
        </div>
      </div>
    );
  };

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

  const successStatus = () => {
    return (
      <div className="update-payment__status">
        <Svg icon="success" modifier={`update-payment__status__icon`} />
        <div
          tabIndex={0}
          aria-label="Congratulations the your payment information was successfully updated. Click close to return to the my account dashboard."
        >
          <p className="update-payment__status__title">Payment Information Updated.</p>
          <p className="update-payment__status__body">
            Your payment information was successfully updated.
          </p>
        </div>

        <div className="update-payment__status__card">
          <Svg
            icon={getTypeCard(data.paymentDetail.cardType)}
            modifier="update-payment__status__card__icon"
          />
          <label className="update-payment__status__card__number">{`${data.paymentDetail.cardNumber}`}</label>
        </div>
        <Button
          text={'CLOSE'}
          modifier="update-payment__status--closeButton"
          clickEvent={() => onCloseModal()}
        />
      </div>
    );
  };

  const stepHandler = () => {
    switch (step) {
      case 0:
        return updatePaymentForm();
      case 1:
        if (showError) {
          return failedStatus();
        } else {
          return successStatus();
        }
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} help={help} legal={true}>
      {stepHandler()}
    </Modal>
  );
};

export default UpdatePaymentDetail;

import { useState, useEffect } from 'react';
import ErrorModal from '../components/error-modal';
import Login from '../components/login-flow/login';
import Passcode from '../components/login-flow/passcode';
import WeatherImage from '../components/weather-image';
import MapError from '../data/mappings/errors-mapping';
import WelcomeBack from '../components/signup-flow/welcome-back';
import Chooseplan from '../components/signup-flow/chooseplan';
import BillingForm from '../components/signup-flow/billing-form';
import Success from '../components/success';
import Loading from '../components/loading';
import getSubscriptions from '../hooks/components/get-subscriptions';
import postSubscriptionTo from '../hooks/components/post-subscription-to';
import getProducts from '../hooks/components/get-products';
import updateBillingInformation from '../hooks/components/update-billing-information';

const LoginAccount = () => {
  const [step, setStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [subscription, setSubscription] = useState({});
  const [statusAccount, setStatusAccount] = useState();
  const [isLoading, setIsLoading] = useState();
  const { data: subscriptionsData } = getSubscriptions();
  const toggleError = () => setShowModal(!showModal);

  const changePage = (goTo) => {
    if (goTo || goTo === 0) {
      setStep(goTo);
    } else {
      setStep(step + 1);
    }
  };

  const showError = (error, goto) => {
    const message = MapError(
      error.message
        ? error.message
        : error.error_description
        ? error.error_description
        : error.error
    );
    setErrorMessage(message);
    setStep(goto);
    toggleError();
  };

  const getStatus = (status) => {
    setStatusAccount(status);
  };

  const setSubscriptionData = (data) => {
    const temp = {
      ...subscription,
      ...data
    };
    setSubscription(temp);
  };

  const { getMembershipStatus } = getProducts(
    (response) => {
      if (!response.success) {
        showError(response, 4);
      } else {
        changePage();
        return response.products.svod[0].state;
      }
    },
    (error) => {
      showError(error, 4);
    }
  );

  const { postDataTo } = postSubscriptionTo(
    (response) => {
      if (!response.success) {
        showError(response, 4);
      } else {
        getMembershipStatus();
      }
    },
    (error) => {
      showError(error, 4);
    }
  );

  async function activateSuscription() {
    if (subscriptionsData && subscriptionsData.length > 0) {
      const product = subscriptionsData.find((product) => product.name === subscription.type);

      await postDataTo(product.id);
    } else {
      showError({ message: 'fatal' }, 4);
    }
  }

  const { update } = updateBillingInformation(
    (response) => {
      if (!response.success) {
        showError(response, 4);
        setIsLoading(false);
      } else {
        setSubscriptionData(response.subscriptions.payment_profile);
        setIsLoading(false);
      }
    },
    (error) => {
      error.message = 'fatal';
      showError(error, 4);
    }
  );

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

  useEffect(() => {
    if (subscription && step === 5) {
      if (statusAccount === 'canceled') {
        activateSuscription();
        update(paymentDataFormat(subscription));
      }
    }
  }, [step]);

  const stepHandler = () => {
    switch (step) {
      case 0:
        return <Login changeStep={changePage} isLogin={true} />;
      case 1:
        return (
          <Passcode
            toggleError={showError}
            isLogin={true}
            changeStep={changePage}
            statusAccount={getStatus}
          />
        );
      case 2:
        return <WelcomeBack changeStep={changePage} />;
      case 3:
        return <Chooseplan setSubscriptionData={setSubscriptionData} changeStep={changePage} />;
      case 4:
        return (
          <BillingForm
            subscriptionData={subscription}
            setSubscriptionData={setSubscriptionData}
            changeStep={changePage}
            isLoading={isLoading}
          />
        );
      case 5:
        return <Loading data={subscription} message={'Submitting Subscription'} />;
      case 6:
        return (
          <Success message="Use your email address to sign-in to The Weather Channel app on any supported Television device, including Roku, FireTV, Android TV, Samsung TV, Xfinity Flex and more." />
        );
    }
  };

  return (
    <>
      <title>Sign In to Manage Your Subscription</title>
      <WeatherImage />
      {stepHandler()}
      <ErrorModal
        onClose={() => toggleError()}
        isOpen={showModal}
        errorMessage={errorMessage}
        showHelp={true}
        action={toggleError}
      />
      ;
    </>
  );
};

export default LoginAccount;

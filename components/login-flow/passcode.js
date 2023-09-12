import React, { useState } from 'react';
import Field from '../field';
import Button from '../button';
import AvailableDevices from '../available-devices';
import getAccessToken from '../../hooks/components/get-acess-token';
import getProducts from '../../hooks/components/get-products';
import getPasscode from '../../hooks/components/get-passcode';
import useUser from '../../hooks/use-user';
import router from 'next/router';

const Passcode = ({ toggleError, isLogin, changeStep, statusAccount }) => {
  const { user, clearCookie } = useUser();
  const [passcode, setPasscode] = useState('');
  const [resend, setResend] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const { sendPasscode } = getAccessToken(
    (response) => {
      if (response.status === 200) {
        getMembershipStatus();
      } else {
        setLoadingData(false);
        toggleError(response, 1);
      }
    },
    (error) => {
      setLoadingData(false);
      toggleError(error, 1);
    },
    isLogin
  );

  const { getMembershipStatus } = getProducts(
    (response) => {
      if (response.status === 200) {
        if (isLogin) {
          if (response.products.svod[0].state === 'canceled') {
            statusAccount(response.products.svod[0].state);
            clearCookie();
            changeStep(2);
          } else {
            router.push({
              pathname: '/manage-account'
            });
          }
        } else {
          clearCookie();
          if (response.products.svod[0].state === 'canceled') {
            statusAccount(response.products.svod[0].state);
            changeStep(2);
          } else {
            changeStep(6);
          }
        }
      } else {
        clearCookie();
        if (isLogin) {
          toggleError(response);
        } else {
          changeStep(3);
        }
      }
      setLoadingData(false);
    },
    (error) => {
      toggleError(error);
    }
  );

  const { sendEmail } = getPasscode();

  const onSendPassCode = () => {
    if (passcode !== '') {
      setLoadingData(true);
      sendPasscode(passcode);
    }
  };

  return (
    <div className="passcode">
      <h1 className="passcode__title">
        {isLogin ? 'Log In to Manage Your Subscription' : 'Create Your Account'}
      </h1>
      {resend ? (
        <p className="passcode__resend">
          A new passcode has been sent to your email address you provided.
        </p>
      ) : (
        <p className="passcode__subtitle">
          A one-time passcode was sent to your email address. Please check your email and enter the
          code below.
        </p>
      )}
      <div className="passcode__container">
        <Field
          label="Enter passcode"
          modifierLabel="container-field__label"
          name="passcode"
          id={'passcode'}
          onPressEnter={onSendPassCode}
          getValue={(value) => {
            setPasscode(value);
          }}
        />

        <Button
          text="CONTINUE"
          clickEvent={onSendPassCode}
          disabled={passcode !== '' ? false : true}
          isLoading={loadingData}
          modifier="passcode__container--button"
          ariaLabel="By clicking on the continue button, you will gain access to The Weather Channel on your TV Device"
        />

        <div tabIndex={0} aria-label="Read the text on screen">
          <p className="passcode__container--no-passcode">
            Didn’t receive the passcode? Please check your spam folder or click{' '}
            <button
              className="passcode__container--link"
              onClick={() => {
                sendEmail(user.email);
                setResend(true);
              }}
            >
              here
            </button>{' '}
            to resend email.
          </p>

          <p className="passcode__container--conditions-second">
            If you need to re-enter your email address and try again, click{' '}
            <button
              className="passcode__container--link"
              onClick={() => {
                changeStep(0);
              }}
            >
              here
            </button>{' '}
          </p>

          <p className="passcode__container--conditions">
            If you subscribed through your television device, like Roku, FireTV, or Android TV,
            please manage your subscription on that device.
          </p>
          <p>
            If you access The Weather Channel TV app through your cable or satellite provider you
            can not use your cable or satellite credentials to log-in to this website to manage your
            account.
          </p>
        </div>
      </div>

      <AvailableDevices />
    </div>
  );
};

export default Passcode;

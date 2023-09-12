import React, { useState } from 'react';
import Field from '../field';
import Button from '../button';
import AvailableDevices from '../available-devices';
import getPasscode from '../../hooks/components/get-passcode';
import useUser from '../../hooks/use-user';

const Login = ({ changeStep, isLogin }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const { sendEmail } = getPasscode(() => {
    setLoadingData(false);
    changeStep();
  });
  const { setUserEmail } = useUser();

  const onEmailSubmit = () => {
    if (email !== '' && !emailError) {
      setLoadingData(true);
      sendEmail(email);
    }
  };

  const createAccount = () => {
    return (
      <div className="create-account">
        <h1 className=" create-account__title">Create Your Account</h1>
        <div className="container-field">
          <Field
            label="Enter Email Address (make sure it’s correct)"
            modifierLabel="container-field__label"
            name="email"
            type={'email'}
            id={'email'}
            onPressEnter={onEmailSubmit}
            getValue={(value) => {
              setEmail(value);
              setUserEmail(value);
            }}
            getError={setEmailError}
          />

          <Button
            isLoading={loadingData}
            text="AGREE & CONTINUE"
            clickEvent={() => {
              onEmailSubmit();
            }}
            modifier="container-field__button"
            disabled={email !== '' && !emailError ? false : true}
          />
        </div>
        <div className="conditions">
          <p>
            By selecting “Agree and Continue” you agree to The Weather Channel app{' '}
            <a
              target="_blank"
              className="conditions__link"
              href="/legal?section=visitor-agreement"
              aria-label=" By clicking “Agree & Continue” you agree to The Weather channel App User agreement and Privacy Notice. You can click on the hyperlinks to learn more about User Agreement and Privacy notice in detail."
            >
              Visitor Agreement
            </a>{' '}
            &{' '}
            <a
              target="_blank"
              className="conditions__link"
              href="/legal?section=privacy-policy"
              aria-label=" By clicking “Agree & Continue” you agree to The Weather channel App User agreement and Privacy Notice. You can click on the hyperlinks to learn more about User Agreement and Privacy notice in detail."
            >
              Privacy Notice
            </a>
            .
          </p>
          <p className="conditions__secondary-text">
            7-Day free trial available only to new users.
          </p>
        </div>
      </div>
    );
  };

  const login = () => {
    return (
      <div className="login">
        <h1 className="login__title">Sign In to Manage Your Subscription</h1>

        <div className="login__container">
          <Field
            label="Enter the email address associated with your subscription"
            modifierLabel="container-field__label"
            name="email"
            type={'email'}
            id={'email'}
            getError={setEmailError}
            onPressEnter={onEmailSubmit}
            getValue={(value) => {
              setEmail(value);
              setUserEmail(value);
            }}
          />

          <Button
            text="CONTINUE"
            clickEvent={() => {
              onEmailSubmit();
            }}
            disabled={email !== '' && !emailError ? false : true}
            isLoading={loadingData}
            modifier="login__container--button"
            ariaLabel="By clicking on this button, you will receive an email to enter the code to confirm your account exists"
          />

          <div tabIndex={0} aria-label="Read the text on screen">
            <p className="login__container--conditions">
              If you access The Weather Channel TV app through your cable or satellite provider you
              can not use your cable or satellite credentials to log-in to this website to manage
              your account.
            </p>

            <p className="login__container--conditions">
              If you subscribed through Roku, please manage your subscription through your Roku
              account page.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isLogin ? login() : createAccount()}
      <AvailableDevices />
    </>
  );
};

export default Login;

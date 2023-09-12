import Field from './field';
import Button from './button';
import PropTypes from 'prop-types';
import AvailableDevices from './available-devices';
import Svg from './svg';
import { useState } from 'react';

const Signingup = ({
  changeStep,
  title,
  subtititle,
  labelText,
  buttonText,
  isActive,
  success,
  setData
}) => {
  const [code, setCode] = useState('');
  Signingup.propTypes = {
    title: PropTypes.string.isRequired,
    subtititle: PropTypes.string,
    labelText: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    success: PropTypes.bool,
    setData: PropTypes.func
  };

  const getCode = (data) => {
    setCode(data);
  };

  const handleSubmit = () => {
    if (code) {
      setData({ code: code });
      changeStep();
    }
  };

  return (
    <div className="signingup">
      {isActive && !success ? (
        <div
          tabIndex={0}
          aria-label="Uh Oh, that didn’t work. Please enter a new code. Or Navigate back and enter a different email address that meets verification."
        >
          <div className="signingup__failed">
            <Svg icon={'error-alert-white'} modifier="icon" />
          </div>
          <div className="signingup__failed--container">
            <p className="signingup__failed--text">Verification Failed.</p>
            <p className="signingup__subtitle">
              Please{' '}
              <a className="signingup__conditions-link" href="/signup-activate">
                try again
              </a>{' '}
              or enter a new code
            </p>
            <p className="signingup__title">{title}</p>
          </div>
        </div>
      ) : (
        <>
          <p className="signingup__subtitle">{subtititle}</p>
          <p className="signingup__title">{title}</p>
        </>
      )}

      <Field
        label={labelText}
        modifierLabel="signingup__label"
        name="codeTV"
        id={'codeTV'}
        getValue={getCode}
      />
      <Button
        text={buttonText}
        clickEvent={() => handleSubmit()}
        modifier="signingup__button"
        ariaLabel="Click when you have finished entering the code from your TV"
      />

      {!isActive ? (
        <>
          <p className="signingup__text">7-Day free trial available only to new users.</p>
          <p className="signingup__text--body">
            If you access The Weather Channel TV app through your cable or satellite provider you
            can not use your cable or satellite credentials to log-in to this website to manage your
            account.
          </p>

          <AvailableDevices />
        </>
      ) : (
        <p className="signingup__conditions">
          If your TV provider is not listed, you can access The Weather Channel app by signing up
          for as little as $3.99/month. Click{' '}
          <a
            className="signingup__conditions-link"
            href="/signup"
            aria-label=" If you do not have a cable or satellite subscription, you can sign up for The Weather Channel by clicking the hyperlink."
          >
            here
          </a>{' '}
          to sign up now.
        </p>
      )}
    </div>
  );
};

export default Signingup;

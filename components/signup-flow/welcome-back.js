import Button from '../button';
import AvailableDevices from '../available-devices';

const WelcomeBack = ({ changeStep }) => {
  return (
    <div className="welcome-back">
      <h1 className=" welcome-back__title"> {'Welcome Back'}</h1>
      <>
        <p className="welcome-back__already-have__text-body">
          You picked a great plan. To reactivate your subscription, just continue below. The free
          trial period is only for new users but you’ll still get immediate access to The Weather
          Channel.
        </p>
        <Button
          text="AGREE & CONTINUE"
          clickEvent={() => {
            changeStep();
          }}
          modifier="welcome-back__already-have--back-button"
          ariaLabel="Click back, to to go to the previous page"
        />
      </>
      <div className="welcome-back__conditions">
        <p>
          By selecting “Agree and Continue” you agree to The Weather Channel app{' '}
          <a
            className="welcome-back__conditions__link"
            href="/legal?section=visitor-agreement"
            aria-label=" By clicking “Agree & Continue” you agree to The Weather channel App User agreement and Privacy Notice. You can click on the hyperlinks to learn more about User Agreement and Privacy notice in detail."
          >
            Visitor Agreement
          </a>{' '}
          &{' '}
          <a
            className="welcome-back__conditions__link"
            href="/legal?section=privacy-policy"
            aria-label=" By clicking “Agree & Continue” you agree to The Weather channel App User agreement and Privacy Notice. You can click on the hyperlinks to learn more about User Agreement and Privacy notice in detail."
          >
            Privacy Notice
          </a>
          .
        </p>
        <p className="conditions__secondary-text">7-Day free trial available only to new users.</p>
      </div>
      <AvailableDevices />
    </div>
  );
};

export default WelcomeBack;

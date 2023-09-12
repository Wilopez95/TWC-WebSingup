import PropTypes from 'prop-types';
import Modal from './modal';
import Button from './button';
import Svg from './svg';

const ErrorModal = ({ isOpen, onClose, errorMessage, action, showHelp }) => {
  ErrorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    action: PropTypes.func,
    showHelp: PropTypes.bool
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="error-modal">
        <div className="error-modal__logo">
          <Svg icon={'error-alert-black'} modifier="icon" />
        </div>

        <div
          tabIndex={0}
          aria-label="Looks like that didn’t go as planned.Please Try Again."
          className="error-modal__frame"
        >
          <h2 className="error-modal__title">That Didn’t Go As Planned.</h2>
          <p className="error-modal__content">{errorMessage}</p>
          <Button text={'TRY AGAIN'} modifier="error-modal__button" clickEvent={action} />
        </div>

        {showHelp && (
          <div className="error-modal__help">
            <p>
              If you are still having trouble and need further assistance, click{' '}
              <a className="error-modal__help--link" href="/help" target="_blank">
                here
              </a>{' '}
              to go to our help section.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ErrorModal;

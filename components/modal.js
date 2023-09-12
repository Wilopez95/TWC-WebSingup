import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';
import Svg from './svg';

const Modal = ({
  isOpen,
  onClose,
  contentModifier,
  children,
  help,
  legal,
  message,
  messageText
}) => {
  Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    contentModifier: oneOfType([PropTypes.string, PropTypes.bool]),
    help: PropTypes.bool,
    legal: PropTypes.bool,
    message: PropTypes.bool,
    messageText: PropTypes.string
  };

  useEffect(() => {
    if (document && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // check for ssr since the dom doesn't exist at this point
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  const modalMarkup = () => (
    <FocusTrap active={isOpen}>
      <div className="modal">
        <div className="modal__card">
          <div className={`modal__content ${contentModifier ? contentModifier : ''}`}>
            <div className="modal__content__body">
              <button
                className="modal__close"
                onClick={() => onClose()}
                aria-label="Click the 'x' to close"
              >
                <Svg icon="closeModal" />
              </button>
              {children}
            </div>
            {(help || legal || message) && (
              <div className="modal__footer">
                {help && (
                  <a
                    target="_blank"
                    className="modal__footer__item"
                    aria-label="Clicking on the Help Link will take you to the Help page"
                    href="/help"
                  >
                    Help
                  </a>
                )}
                {legal && (
                  <a
                    target="_blank"
                    className="modal__footer__item"
                    aria-label="Clicking on the Legal Link will take you to the Legal page"
                    href="/legal"
                  >
                    Legal
                  </a>
                )}
                {message && <p className="modal__footer__item">{messageText}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </FocusTrap>
  );

  if (!canUseDOM || !isOpen) {
    return null;
  }

  return createPortal(modalMarkup(), document.getElementById('main-body'));
};

export default Modal;

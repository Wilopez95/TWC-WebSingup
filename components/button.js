import React from 'react';
import PropTypes from 'prop-types';

export default function Button({
  text,
  ariaLabel,
  url,
  clickEvent,
  modifier,
  color,
  target = '_blank',
  disabled,
  isLoading = false
}) {
  const isCta = !!clickEvent;
  const colorModifier = color ? 'button--' + color : '';

  Button.propTypes = {
    text: PropTypes.string.isRequired,
    ariaLabel: PropTypes.string,
    url: PropTypes.string,
    modifier: PropTypes.string,
    color: PropTypes.string,
    clickEvent: PropTypes.func,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    rel: PropTypes.string
  };

  const disableLink = (event) => event.preventDefault();

  return isCta ? (
    <button
      className={`button ${colorModifier || ''} ${isLoading ? 'button--transparent' : ''} ${
        modifier || ''
      } ${disabled ? 'button--disabled' : ''} `}
      aria-label={ariaLabel}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={clickEvent}
    >
      {isLoading && <img className="button__loader" alt="loader" src="/images/loader.gif" />}
      <span className="button--underline">{text}</span>
    </button>
  ) : (
    <a
      className={`button ${colorModifier || ''} ${modifier || ''} ${
        disabled ? 'button--disabled' : ''
      }`}
      href={url}
      aria-label={ariaLabel}
      onClick={disabled ? disableLink : null}
      aria-disabled={disabled}
      target={target}
      rel="noreferrer"
    >
      <span className="button--underline">{text}</span>
    </a>
  );
}

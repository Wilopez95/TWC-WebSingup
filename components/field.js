import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import Svg from './svg';
import {
  validateCreditCardNumber,
  validateCardHolderName,
  validateZipCode,
  validateCardCVV
} from '../helpers/credit-card-validation';

const Field = ({
  label,
  obligatory = false,
  size,
  initialValue = '',
  defaultChecked,
  type = 'text',
  options,
  id,
  name,
  modifierLabel,
  modifierSelect,
  disabled = false,
  getValue,
  getError,
  onPressEnter,
  placeholder,
  setIsError,
  tooltip,
  onChange,
  tooltipModifier,
  maxLength,
  errorState
}) => {
  const [error, setError] = useState(errorState ? errorState : false);
  const [errorMessage, setErrorMessage] = useState(
    type === 'select'
      ? `Error: Please select a different value`
      : `Error: This field can't be empty`
  );
  const [value, setValue] = useState(initialValue);
  const [filterOptions, setFilterOptions] = useState([]);
  const fieldSize = size ? 'field--' + size : '';
  const isCheckBox = type === 'checkbox';

  Field.propTypes = {
    label: PropTypes.string,
    obligatory: PropTypes.bool,
    id: PropTypes.string,
    size: PropTypes.string,
    initialValue: PropTypes.string,
    defaultChecked: PropTypes.bool,
    type: PropTypes.string,
    options: PropTypes.array,
    modifierLabel: PropTypes.string,
    modifierSelect: PropTypes.string,
    getValue: PropTypes.func,
    getError: PropTypes.func,
    onPressEnter: PropTypes.func,
    setIsError: PropTypes.func,
    onChange: PropTypes.func,
    tooltipModifier: PropTypes.string,
    maxLength: PropTypes.number,
    errorState: PropTypes.bool
  };

  useEffect(() => {
    if (getError) {
      getError(error);
    }
  }, [error]);

  useEffect(() => {
    setError(errorState);
  }, [errorState]);

  const handleChange = (event) => {
    const data = event.target.value;
    if (getValue) {
      getValue(data);
    }
    if (data.trim() === '' && type !== 'address2') {
      setError(true);
      setErrorMessage(`Error: This field can't be empty`);
    } else if (type === 'phone') {
      var re = new RegExp('^([0-9]{3})[ ]([0-9]{3})[ ]([0-9]{4})$');
      if (!re.test(event.target.value)) {
        setError(true);
        setErrorMessage(
          `Mobile Phone is not valid. Please enter a valid phone number. Example: 917 541 1211`
        );
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else {
      setError(false);
      setErrorMessage('');
    }
    if (type === 'select') {
      if (event.target.value === 'Choose') {
        setError(true);
        setErrorMessage(`Please enter a valid ${name}.`);
      } else {
        setError(false);
        setErrorMessage('');
      }
    }
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    const data = event.target.value;
    if (getValue) {
      getValue(data);
    }
    if (data.trim() === '' && type !== 'address2') {
      setError(true);
      setErrorMessage(`Error: This field can't be empty`);
    } else if (type === 'phone') {
      var re = new RegExp('^([0-9]{3})[ ]([0-9]{3})[ ]([0-9]{4})$');
      if (!re.test(event.target.value)) {
        setError(true);
        setErrorMessage(
          `Mobile Phone is not valid. Please enter a valid phone number. Example: 917 541 1211`
        );
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else if (type === 'cardNumber') {
      if (!validateCreditCardNumber(data)) {
        setError(true);
        setErrorMessage(`Invalid credit card number. Please try again.`);
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else if (type === 'cardName') {
      if (!validateCardHolderName(data)) {
        setError(true);
        setErrorMessage(`Please enter your name as it appears on your card and try again.`);
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else if (type === 'select') {
      if (data === 'Choose') {
        setError(true);
        setErrorMessage(`Please enter a valid ${name}.`);
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else if (type === 'zipCode') {
      if (!validateZipCode(data)) {
        setError(true);
        setErrorMessage(`Invalid zip code. Please try again.`);
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else if (type === 'cardCVV') {
      if (!validateCardCVV(data)) {
        setError(true);
        setErrorMessage(`Invalid security code. Please try again.`);
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else if (type === 'email') {
      var rex = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!rex.test(event.target.value)) {
        setError(true);
        setErrorMessage(
          `Email is not valid. Please enter a valid email. Example: something@email.com`
        );
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else {
      setError(false);
      setErrorMessage('');
    }
    setValue(event.target.value);
  };

  useEffect(() => {
    if (setIsError) {
      setIsError(id, error);
    }
  }, [error]);

  const getInput = () => (
    <input
      id={id}
      name={name}
      className={`field__input ${isCheckBox ? 'field__input--checkbox' : ''}`}
      type={type ? type : 'text'}
      value={value}
      defaultChecked={isCheckBox ? defaultChecked : false}
      onChange={handleChange}
      disabled={disabled}
      placeholder={placeholder ? placeholder : ''}
      onBlur={onSubmit}
      maxLength={maxLength}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          onSubmit(event);
        }
      }}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          if (onPressEnter) {
            onPressEnter();
          }
        }
      }}
    />
  );

  const getTextArea = () => (
    <textarea
      id={id}
      className="field__textarea"
      value={value}
      onChange={handleChange}
      onBlur={onSubmit}
    />
  );

  const getProvidersSelect = () => (
    <>
      <input
        type="text"
        disabled={disabled}
        placeholder={placeholder ? placeholder : ''}
        onChange={lookAHead}
        list={`${id}-options`}
        className="field__input"
        id={id}
      />
      <div className={filterOptions.length ? 'field__options' : 'field__options--hide'}>
        {filterOptions.map((option) => {
          return (
            <button
              className="field__options__button"
              key={option.label}
              onClick={() => onChange(option.label)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </>
  );

  const getSelect = () => {
    return (
      <select
        disabled={disabled}
        value={value}
        className={`field__select ${modifierSelect ? modifierSelect : ''}`}
        onChange={handleChange}
        onBlur={onSubmit}
        id={id}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.value}
          </option>
        ))}
      </select>
    );
  };
  const lookAHead = (event) => {
    const data = event.target.value;
    if (data.length) {
      const listOptions = options.filter((option) => option.label.includes(data));
      setFilterOptions(listOptions);
    } else {
      setFilterOptions([]);
    }
  };

  const getField = () => {
    switch (type) {
      case 'textarea':
        return getTextArea();
      case 'input-select':
        return getProvidersSelect();
      case 'select':
        return getSelect();
      case 'date':
      case 'phone':
      case 'checkbox':
      case 'text':
      case 'cardName':
      case 'address':
      case 'address2':
      case 'city':
      case 'cardExpirationDate': //Edit
      case 'cardNumber':
      case 'cardCVV':
      case 'password':
      case 'email':
      case 'zipCode':
        return getInput();
    }
  };

  return (
    <div className={`field ${fieldSize}`}>
      <div className={`field__content ${isCheckBox ? 'field__content--checkbox' : ''}`}>
        <label
          className={`${modifierLabel ? modifierLabel : 'field__label'} ${
            isCheckBox ? 'field__label--checkbox' : ''
          }`}
          htmlFor={label}
        >
          <div className="field__label__text">
            {label}
            {obligatory && <p className="field__label__obligatory">*</p>}
          </div>
          {tooltip && (
            <>
              <a data-tip={tooltip} style={{ height: 0 }}>
                <Svg
                  icon="tooltip"
                  modifier={`field__icon ${tooltipModifier ? tooltipModifier : ''}`}
                />
              </a>
              <ReactTooltip
                place="right"
                type="light"
                effect="solid"
                className="field__tooltip"
                html={true}
              />
            </>
          )}
        </label>
        {getField()}
      </div>
      <span className="field__error">{error && errorMessage}</span>
    </div>
  );
};

export default Field;

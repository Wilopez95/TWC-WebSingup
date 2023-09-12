import React, { useState } from 'react';
import Field from '../field';
import Button from '../button';
import SubscriptionModal from '../subscription-modal';
import billingInformation from '../../data/components/billing-form.json';
import SelectorData from '../../constants/selectors-data';

const BillingForm = ({
  setSubscriptionData,
  changeStep,
  subscriptionData,
  initialData,
  isModal,
  onCloseModal,
  modifier,
  isLoading,
  configData
}) => {
  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!isModalOpen);
  const { months, years, states } = SelectorData();
  const [fieldErrors, setFieldErrors] = useState({
    cardFirstName: false,
    cardLastName: false,
    cardNumber: false,
    expirationMonthDate: false,
    expirationYearDate: false,
    securityCode: false,
    address: false,
    address2: false,
    city: false,
    state: false,
    zipCode: false
  });

  const validateEmptyField = (field, fields) => {
    if (!fieldErrors[field] && fields[field] !== '') {
      if (field === 'expirationMonthDate' || field === 'expirationYearDate' || field === 'state') {
        if (fields[field] !== 'Choose') {
          return true;
        } else {
          setFieldErrors({ ...fieldErrors, [field]: true });
          return false;
        }
      } else {
        return true;
      }
    }
    setFieldErrors({ ...fieldErrors, [field]: true });
    return false;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = Array.prototype.slice
      .call(event.target)
      .filter((el) => el.id && el.id !== 'member_since')
      .reduce(
        (form, el) => ({
          ...form,
          [el.id]: el.type === 'checkbox' ? el.checked : el.value
        }),
        {}
      );
    if (
      validateEmptyField('cardFirstName', fields) &&
      validateEmptyField('cardLastName', fields) &&
      validateEmptyField('cardNumber', fields) &&
      validateEmptyField('expirationMonthDate', fields) &&
      validateEmptyField('expirationYearDate', fields) &&
      validateEmptyField('securityCode', fields) &&
      validateEmptyField('address', fields) &&
      validateEmptyField('city', fields) &&
      validateEmptyField('state', fields) &&
      validateEmptyField('zipCode', fields)
    ) {
      setSubscriptionData({
        ...fields,
        lastDigits: fields.cardNumber.substr(fields.cardNumber.length - 4)
      });
      toggleModal();
    }
  };

  const setHandleIsError = (name, error) => {
    setFieldErrors({ ...fieldErrors, [name]: error });
  };

  const buttonSave = () => {
    return (
      <Button
        text={'SAVE'}
        modifier="billing-form__modal-footer__button"
        ariaLabel="Click Save to save the card to file"
        clickEvent={() => {}}
      />
    );
  };

  const buttonCancel = () => {
    return (
      <Button
        text={'CANCEL'}
        color="white"
        modifier="billing-form__modal-footer__button"
        clickEvent={() => onCloseModal()}
        ariaLabel="Click Cancel to return to the My Account Dashboard"
      />
    );
  };

  const modalFooter = () => {
    return (
      <div className="billing-form__modal-footer">
        {buttonSave()}
        {buttonCancel()}
      </div>
    );
  };

  const regularFooter = () => {
    return (
      <>
        <div
          className="billing-form__description"
          dangerouslySetInnerHTML={{
            __html: billingInformation.description
              .replaceAll('${planPrice}', subscriptionData.price)
              .replace('${planType}', subscriptionData.type === 'Annual' ? 'year' : 'month')
              .replace('${planTypely}', subscriptionData.type)
          }}
        />
        <Button
          text={'CONTINUE'}
          modifier="billing-form__button"
          clickEvent={() => {}}
          disabled={disabled || submitted}
          ariaLabel="By clicking “Agree & Continue” you agree to The Weather channel App User agreement and Privacy Notice. You can click on the hyperlinks to learn more about User Agreement and Privacy notice in detail. "
        />
        {/* <div
          className="billing-form__terms"
          dangerouslySetInnerHTML={{
            __html: billingInformation.terms
          }}
        /> */}
        <div
          className="billing-form__trail"
          dangerouslySetInnerHTML={{
            __html: billingInformation.trial
          }}
        />
      </>
    );
  };

  return (
    <>
      <form
        className={`billing-form ${modifier ? modifier : ''}`}
        onSubmit={handleSubmit}
        onChange={() => {
          setDisabled(false);
          setSubmitted(false);
        }}
      >
        <div
          className="billing-form__title"
          dangerouslySetInnerHTML={{
            __html: !isModal ? billingInformation.title : 'Update Payment Information'
          }}
        />
        <div className={`billing-form__row ${isModal ? 'billing-form--is-modal' : ''}`}>
          <Field
            label="First Name on Card"
            obligatory={true}
            name="cardFirstName"
            size="xl"
            id={'cardFirstName'}
            type={'cardName'}
            modifierLabel={'billing-form__fieldLabel'}
            setIsError={setHandleIsError}
            errorState={fieldErrors['cardFirstName']}
            initialValue={
              initialData && initialData.customerNames && initialData.customerNames.first_name
            }
          />
          <Field
            label="Last Name on Card"
            obligatory={true}
            name="cardLastName"
            size="xl"
            id={'cardLastName'}
            type={'cardName'}
            modifierLabel={'billing-form__fieldLabel'}
            setIsError={setHandleIsError}
            errorState={fieldErrors['cardLastName']}
            initialValue={
              initialData && initialData.customerNames && initialData.customerNames.last_name
            }
          />
        </div>
        <div className={`billing-form__row ${isModal ? 'billing-form--is-modal' : ''}`}>
          <Field
            label="Card Number"
            obligatory={true}
            name="cardNumber"
            size="xl"
            id={'cardNumber'}
            type={'cardNumber'}
            modifierLabel={'billing-form__fieldLabel'}
            setIsError={setHandleIsError}
            errorState={fieldErrors['cardNumber']}
          />
          <div className="billing-form__row__dzc">
            <Field
              label="Expiration Month"
              obligatory={true}
              name="month"
              id={'expirationMonthDate'}
              type="select"
              options={months}
              modifierSelect={'billing-form__fieldSelect'}
              size={isModal ? 'sx-modal' : 'sx'}
              placeholder={'Choose'}
              modifierLabel={'billing-form__fieldLabel'}
              setIsError={setHandleIsError}
              errorState={fieldErrors['expirationMonthDate']}
            />
            <Field
              label="Expiration Year"
              obligatory={true}
              name="year"
              id={'expirationYearDate'}
              type="select"
              options={years}
              modifierSelect={'billing-form__fieldSelect'}
              size={isModal ? 'sx-modal' : 'sx'}
              placeholder={'Choose'}
              modifierLabel={'billing-form__fieldLabel'}
              setIsError={setHandleIsError}
              errorState={fieldErrors['expirationYearDate']}
            />
            <Field
              label="Security Code"
              obligatory={true}
              name="securityCode"
              id={'securityCode'}
              type={'cardCVV'}
              maxLength={4}
              size={isModal ? 'sx-modal' : 'sx'}
              placeholder={'CCV'}
              tooltip={
                '<h2 class="field__tooltip-header">Security Code</h2>' +
                '<p>Turn your card over and look at the signature box. You should see either the entire card number or four digits followed by a special 3-digit code. This 3-digit code is your Card Security Code.</p>'
              }
              tooltipModifier={isModal && 'billing-form--tooltipDark'}
              modifierLabel={'billing-form__fieldLabel'}
              setIsError={setHandleIsError}
              errorState={fieldErrors['securityCode']}
              initialValue={initialData && initialData.securityCode}
            />
          </div>
        </div>
        <div className={`billing-form__row ${isModal ? 'billing-form--is-modal' : ''}`}>
          <Field
            label="Billing Address"
            obligatory={true}
            name="address"
            size="xl"
            id={'address'}
            type={'address'}
            modifierLabel={'billing-form__fieldLabel'}
            setIsError={setHandleIsError}
            errorState={fieldErrors['address']}
            initialValue={
              initialData &&
              initialData.customerAddress &&
              initialData.customerAddress.billing_address
            }
          />
          <Field
            label="Billing Address 2"
            name="address2"
            size="xl"
            id={'address2'}
            type={'address2'}
            modifierLabel={'billing-form__fieldLabel'}
            setIsError={setHandleIsError}
            errorState={fieldErrors['address2']}
            initialValue={
              initialData &&
              initialData.customerAddress &&
              initialData.customerAddress.billing_address_2
            }
          />
        </div>
        <div className={`billing-form__row ${isModal ? 'billing-form--is-modal' : ''}`}>
          <Field
            label="Billing City"
            obligatory={true}
            name="city"
            size="xl"
            id={'city'}
            type={'city'}
            modifierLabel={'billing-form__fieldLabel'}
            setIsError={setHandleIsError}
            errorState={fieldErrors['city']}
            initialValue={
              initialData && initialData.customerAddress && initialData.customerAddress.billing_city
            }
          />
          <div className="billing-form__row__dzc">
            <Field
              label="Billing State"
              obligatory={true}
              name="state"
              id={'state'}
              type="select"
              options={states}
              modifierSelect={'billing-form__fieldSelect'}
              size="sx"
              placeholder={'Choose'}
              modifierLabel={'billing-form__fieldLabel'}
              setIsError={setHandleIsError}
              errorState={fieldErrors['state']}
            />
            <Field
              label="Billing Zip Code"
              obligatory={true}
              name="zipCode"
              size="sx"
              type={'zipCode'}
              maxLength={5}
              id={'zipCode'}
              tooltip={
                '<h2 class="field__tooltip-header">Enter Your ZIP Code</h2>' +
                '<p>Your billing zip code refers to the location where your method of payment is billed. We collect this zip code in order to assess sales tax on your subscription.</p>'
              }
              tooltipModifier={isModal && 'billing-form--tooltipDark'}
              modifierLabel={'billing-form__fieldLabel'}
              setIsError={setHandleIsError}
              errorState={fieldErrors['zipCode']}
              initialValue={
                initialData &&
                initialData.customerAddress &&
                initialData.customerAddress.billing_zip
              }
            />
          </div>
        </div>
        {isModal ? modalFooter() : regularFooter()}
      </form>
      <SubscriptionModal
        onClose={() => toggleModal()}
        isOpen={isModalOpen}
        changeStep={changeStep}
        subscriptionData={subscriptionData}
        isLoading={isLoading}
        isModal={isModal}
        configData={configData}
      />
    </>
  );
};

export default BillingForm;

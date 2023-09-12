import React from 'react';
import PropTypes from 'prop-types';
import Svg from './svg';

export default function SelectPlan({ plans, planSelected, setPlanSelected }) {
  SelectPlan.propTypes = {
    plans: PropTypes.object.isRequired
  };

  const planId = planSelected ? planSelected.id : setPlanSelected(plans.monthSubscription);

  const content = (isActive, price, time, promotion) => {
    return (
      <>
        <div className="selectplan__box__pricing">
          <p className={`selectplan__box__pricing--amount ${isActive ? 'active--text' : ''}`}>
            {price}
          </p>
          <p className={`selectplan__box__pricing--time ${isActive ? 'active--text' : ''}`}>
            {`/ ${time}`}
          </p>
        </div>
        <div className="selectplan__box__promotion">
          <p className={`selectplan__box__promotion--text ${isActive ? 'active--text' : ''}`}>
            {promotion}
          </p>
        </div>
        <div className={`selectplan__checkbox ${isActive ? 'active--checkbox' : ''}`}>
          {isActive && <Svg icon="check" modifier="icon" />}
        </div>
      </>
    );
  };

  return (
    <div className="selectplan">
      <button
        className={`selectplan__box ${
          planId && plans.monthSubscription.id === planId ? 'active' : ''
        }`}
        id="mo"
        onClick={() => setPlanSelected(plans.monthSubscription)}
      >
        {content(
          planId && plans.monthSubscription.id === planId,
          plans.monthSubscription.price,
          'mo',
          plans.monthSubscription.info
        )}
      </button>
      <button
        className={`selectplan__box ${
          planId && plans.yearSubscription.id === planId ? 'active' : ''
        }`}
        id="yr"
        onClick={() => setPlanSelected(plans.yearSubscription)}
      >
        {content(
          planId && plans.yearSubscription.id === planId,
          plans.yearSubscription.price,
          'yr',
          plans.yearSubscription.info
        )}
      </button>
    </div>
  );
}

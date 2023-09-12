import React from 'react';
import Button from '../../components/button';

const ChooseRightPlan = ({ data }) => {
  const plan = (planData) => {
    const plantAmount = planData.body.split('/');
    return (
      <div className="choose-rigth-plan__right__plan">
        <p className="choose-rigth-plan__right__plan__title">{planData.headline}</p>
        <div className="choose-rigth-plan__right__plan__amount-container">
          <p className="choose-rigth-plan__right__plan__amount-container__amount">
            {plantAmount[0]}
          </p>
          <p className="choose-rigth-plan__right__plan__amount-container__amount-prefix">
            {'/' + plantAmount[1]}
          </p>
        </div>
        <div className="choose-rigth-plan__right__plan__offer-container">
          <p className="choose-rigth-plan__right__plan__offer-container__text">
            {planData.underline}
          </p>
        </div>
        <Button
          text={'START 7-DAY FREE TRIAL'}
          modifier={'choose-rigth-plan__right__plan__button'}
          color="red"
          url={'/subscription'}
          target=""
        />
      </div>
    );
  };

  return (
    <div className={'layout'}>
      <div className={'layout--left'}>
        <div className="choose-rigth-plan">
          <div className="choose-rigth-plan__left">
            <div className="choose-rigth-plan__left__title-container">
              <p className="choose-rigth-plan__left__title-container__title">{data.headline}</p>
            </div>
            <p className="choose-rigth-plan__left__body-text">{data.body}</p>
          </div>
          <div className="choose-rigth-plan__right">
            {plan(data.plans[0])}
            {plan(data.plans[1])}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRightPlan;

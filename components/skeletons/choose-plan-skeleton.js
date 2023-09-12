import React from 'react';
import Skeleton from '../skeleton';

const ChoosePlanSkeleton = () => {
  return (
    <div className="choose-plan-skeleton">
      <Skeleton variant="square" modifier="choose-plan-skeleton__title" />
      <Skeleton variant="square" modifier="choose-plan-skeleton__subtitle" />

      <div className="choose-plan-skeleton__container-plan">
        <Skeleton variant="square" modifier="choose-plan-skeleton__container-plan__item" />
        <Skeleton variant="square" modifier="choose-plan-skeleton__container-plan__item" />
      </div>

      <Skeleton variant="square" modifier="choose-plan-skeleton__button" />
      <Skeleton variant="square" modifier="choose-plan-skeleton__text" />
      <Skeleton variant="square" modifier="choose-plan-skeleton__second-text" />
      <Skeleton variant="square" modifier="choose-plan-skeleton__second-text" />
    </div>
  );
};

export default ChoosePlanSkeleton;

import React from 'react';
import Skeleton from '../skeleton';

const AccordionSkeleton = () => {
  return (
    <div className="accordion-skeleton">
      <div>
        <div className="accordion-skeleton__item">
          <Skeleton modifier="accordion-skeleton__text" />
          <Skeleton modifier="accordion-skeleton__icon" />
        </div>
        <div className="accordion-skeleton__item">
          <Skeleton modifier="accordion-skeleton__text" />
          <Skeleton modifier="accordion-skeleton__icon" />
        </div>
        <div className="accordion-skeleton__item">
          <Skeleton modifier="accordion-skeleton__text" />
          <Skeleton modifier="accordion-skeleton__icon" />
        </div>
        <div className="accordion-skeleton__item">
          <Skeleton modifier="accordion-skeleton__text" />
          <Skeleton modifier="accordion-skeleton__icon" />
        </div>
        <div className="accordion-skeleton__item">
          <Skeleton modifier="accordion-skeleton__text" />
          <Skeleton modifier="accordion-skeleton__icon" />
        </div>
        <div className="accordion-skeleton__item">
          <Skeleton modifier="accordion-skeleton__text" />
          <Skeleton modifier="accordion-skeleton__icon" />
        </div>
      </div>
    </div>
  );
};

export default AccordionSkeleton;

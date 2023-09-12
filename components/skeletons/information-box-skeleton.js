import React from 'react';
import Skeleton from '../skeleton';

const InformationBoxSkeleton = () => {
  return (
    <div className="information-box-skeleton">
      <Skeleton variant="square" modifier="information-box-skeleton__title" />
      <Skeleton variant="square" modifier="information-box-skeleton__body-text" />
      <Skeleton variant="square" modifier="information-box-skeleton__body-text" />
      <Skeleton variant="square" modifier="information-box-skeleton__body-text" />
      <Skeleton variant="square" modifier="information-box-skeleton__body-text__secondary" />
    </div>
  );
};

export default InformationBoxSkeleton;

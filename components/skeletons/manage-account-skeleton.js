import React from 'react';
import Skeleton from '../skeleton';

const ManageAccountSkeleton = () => {
  return (
    <div className="manage-account-skeleton">
      <div>
        <div className="manage-account-skeleton__container-title">
          <Skeleton variant="square" modifier="manage-account-skeleton__container-title__box" />
        </div>
      </div>

      <div className="manage-account-skeleton__container-card">
        <div className="manage-account-skeleton__cards">
          <Skeleton variant="square" modifier="manage-account-skeleton__cards__item" />
          <Skeleton variant="square" modifier="manage-account-skeleton__cards__item" />
        </div>

        <div className="manage-account-skeleton__billing-card">
          {' '}
          <Skeleton variant="square" modifier="manage-account-skeleton__billing-card__item" />
        </div>
      </div>
    </div>
  );
};

export default ManageAccountSkeleton;

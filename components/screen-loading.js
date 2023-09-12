import React from 'react';
import Svg from './svg';

const ScreenLoading = () => {
  return (
    <>
      <div className="screen-loading">
        <div className="screen-loading__icon-container">
          <Svg icon="loading" modifier="screen-loading__icon-container--circle" />
        </div>

        <p className="screen-loading__message">The Weather Channel</p>
      </div>
    </>
  );
};

export default ScreenLoading;

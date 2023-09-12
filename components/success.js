import React from 'react';
import PropTypes from 'prop-types';
import Svg from './svg';

const Success = ({ message }) => {
  Success.propTypes = {
    message: PropTypes.string
  };
  return (
    <div className="success">
      <div className="success__icon-container">
        <Svg icon="success" modifier="success__icon-container--circle" />
      </div>

      <h1 className="success__title">
        <span className="success__title--part">Success! </span>Start Watching Immediately.
      </h1>
      <p className="success__message">{message}</p>
    </div>
  );
};

export default Success;

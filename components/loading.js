import React from 'react';
import PropTypes from 'prop-types';
import Svg from './svg';

const Loading = ({ provider, message }) => {
  Loading.propTypes = {
    provider: PropTypes.string
  };

  return (
    <>
      <div className="loading">
        <div className="loading__icon-container">
          <Svg icon="loading" modifier="loading__icon-container--circle" />
        </div>

        <p className="loading__message">{message}</p>
        {provider && <p className="loading__provider">{provider}</p>}
      </div>
    </>
  );
};

export default Loading;

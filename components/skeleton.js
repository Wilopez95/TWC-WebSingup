import React from 'react';
import PropTypes from 'prop-types';

const Skeleton = ({ variant = 'square', modifier }) => {
  Skeleton.propTypes = {
    variant: PropTypes.string,
    modifier: PropTypes.string
  };
  const variantType = () => {
    switch (variant) {
      case 'square':
        return 'square';
      case 'text':
        return 'text';
    }
  };

  return <div className={`skeleton ${variantType()} ${modifier ? modifier : ''}`} />;
};

export default Skeleton;

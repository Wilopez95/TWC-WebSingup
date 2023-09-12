import React from 'react';
import PropTypes from 'prop-types';
import Svg from './svg';

const AccordionItem = ({ title, paragraph, onClick, isActive }) => {
  AccordionItem.propTypes = {
    title: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClick();
    }
  };

  return (
    <div
      className={`accordion-item ${isActive ? 'accordion-item--active' : ''}`}
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyPress={handleKeyPress}
    >
      <div className="accordion-item__container">
        <h3 className={`accordion-item__title `}>{title}</h3>
        <Svg
          modifier={`accordion-item__icon ${isActive ? 'accordion-item__icon--active' : ''}`}
          icon={!isActive ? 'accordion-up' : 'accordion-down'}
        />
      </div>
      <div
        className={`accordion-item__paragraph ${
          isActive ? 'accordion-item__paragraph--active' : ''
        }`}
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    </div>
  );
};

export default AccordionItem;

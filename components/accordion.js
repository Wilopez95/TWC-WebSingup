import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AccordionItem from './accordion-item';
import AccordionSkeleton from './skeletons/accordion-skeleton';
import getFAQ from '../hooks/components/get-FAQ';

const Accordion = ({ isStatic = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data, isloading, error } = getFAQ();
  const [accordionData, setAccordionData] = useState('');

  Accordion.propTypes = {
    isStatic: PropTypes.bool
  };

  useEffect(() => {
    if (data && !isStatic) {
      setAccordionData(data);
    }
  }, [data]);

  if (!isStatic && (isloading || error || !accordionData)) {
    return <AccordionSkeleton />;
  }

  if (accordionData.length === 0) {
    return <AccordionSkeleton />;
  }

  return (
    <div className="accordion">
      {accordionData.title && <h2 className="accordion__title">{accordionData.title}</h2>}
      <div className="accordion__content">
        {accordionData.map((panel, index) => {
          const ariaExpanded = index === activeIndex ? 'true' : 'false';
          const isActive = index === activeIndex;
          return (
            <AccordionItem
              key={index}
              isActive={isActive}
              ariaExpanded={ariaExpanded}
              title={panel.headline}
              paragraph={panel.body[0]}
              onClick={() => setActiveIndex(activeIndex !== index ? index : null)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;

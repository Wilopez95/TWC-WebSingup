/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';

const Picture = ({ images, modifier, imageModifier, onLoadEvent }) => {
  const largeMobile = 420;
  const tablet = 768;
  const desktop = 1200;
  const { imgDesktop, imgTablet, imgLargeMobile, imgMobile } = images;

  Picture.propTypes = {
    images: PropTypes.object.isRequired,
    modifier: PropTypes.string,
    imageModifier: PropTypes.string,
    onLoadEvent: PropTypes.func
  };

  return (
    <picture className={`picture ${modifier ? modifier : ''}`}>
      {imgDesktop && <source media={`(min-width:${desktop}px)`} srcSet={imgDesktop.src} />}
      {imgTablet && <source media={`(min-width:${tablet}px)`} srcSet={imgTablet.src} />}
      {imgLargeMobile && (
        <source media={`(min-width:${largeMobile}px)`} srcSet={imgLargeMobile.src} />
      )}
      {imgMobile && (
        <img
          className={`picture__image ${imageModifier ? imageModifier : ''}`}
          src={imgMobile.src}
          alt={imgMobile.alt}
          onLoad={() => {
            onLoadEvent && onLoadEvent(event);
          }}
        />
      )}
    </picture>
  );
};

export default Picture;

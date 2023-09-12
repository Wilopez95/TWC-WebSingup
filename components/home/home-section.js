import React from 'react';
import AvailableDevices from '../available-devices';
import Picture from '../picture';
import ActiveMaps from './active-maps';
import StreamDevices from './stream-devices';
import useWindowDimensions from '../../helpers/window.dimensions';

const HomeSection = ({
  data,
  streamDevice,
  devices,
  maps,
  modifier,
  modifierImage,
  modifierPicture,
  modifierContent,
  modifierTitleContainer,
  modifierTitle,
  modifierBody,
  OpacityBackground
}) => {
  const { isDesktop, isTablet } = useWindowDimensions();
  const backgroundImage = {
    imgMobile: {
      src: isDesktop ? data.code_block.web : data.code_block.mobile,
      alt: 'alt'
    }
  };
  return (
    <div className={`${modifier} ${!isDesktop && OpacityBackground}`}>
      <Picture modifier={modifierImage} imageModifier={modifierPicture} images={backgroundImage} />
      <div className={`layout ${isTablet && OpacityBackground}`}>
        <div className={'layout--left'}>
          <div className={modifierContent}>
            <div className={modifierTitleContainer}>
              <p className={modifierTitle}>{data.headline}</p>
            </div>

            <div className={modifierBody}>
              <p>{data.body}</p>
            </div>

            {streamDevice && <StreamDevices />}

            {devices && isDesktop && <AvailableDevices showText={false} />}

            {maps && <ActiveMaps />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;

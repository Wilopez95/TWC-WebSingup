import React from 'react';
import MapIcon from '../map-icon';

const ActiveMaps = () => {
  return (
    <div className="active-maps">
      <div className="active-maps__row">
        <MapIcon icon={'radar'} label={'Radar'} />
        <MapIcon icon={'future-radar'} label={'Future Radar'} />
        <MapIcon icon={'lightning'} label={'Lightning'} />
      </div>
      <div className="active-maps__row">
        <MapIcon icon={'active-alerts'} label={'Active Alerts'} />
        <MapIcon icon={'satellite'} label={'Satellite'} />
        <MapIcon icon={'temp'} label={'Temperatures'} />
      </div>
      <div className="active-maps__row">
        <MapIcon icon={'feels-like'} label={'Feels Like'} />
        <MapIcon icon={'winds'} label={'Winds'} />
        <MapIcon icon={'breathin-index'} label={'Breathing Index'} />
      </div>
    </div>
  );
};

export default ActiveMaps;

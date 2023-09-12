import React from 'react';
const StreamDevices = () => {
  return (
    <div className="stream-devices">
      <div className="stream-devices__row">
        <div className="stream-devices__container">
          <img
            src={`/images/stream-devices/roku.png`}
            alt="icon"
            className="stream-devices__roku"
          />
        </div>
        <div className="stream-devices__container">
          <img
            src={`/images/stream-devices/fireTV.png`}
            alt="icon"
            className="stream-devices__amazon"
          />
        </div>
        <div className="stream-devices__container">
          <img
            src={`/images/stream-devices/android.png`}
            alt="icon"
            className="stream-devices__android"
          />
        </div>
      </div>
      {/* To add the vizzio change the class name stream-devices__row-2 to 
      stream-devices__row , and uncomment the vizio logo  */}
      <div className="stream-devices__row-2">
        <div className="stream-devices__container">
          <img
            src={`/images/stream-devices/samsung.png`}
            alt="icon"
            className="stream-devices__samsung"
          />
        </div>
        <div className="stream-devices__container">
          <img
            src={`/images/stream-devices/xfinity.png`}
            alt="icon"
            className="stream-devices__xfinity"
          />
        </div>
      </div>
    </div>
  );
};

export default StreamDevices;

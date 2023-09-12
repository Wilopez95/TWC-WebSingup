import React from 'react';
import Button from '../button';
import WeatherImage from '../weather-image';

const NavButton = () => {
  return (
    <div className="nav-button">
      <div className="nav-button__logo">
        <WeatherImage smallLogo={true} />
      </div>
      <div className="nav-button__container">
        <Button
          color="red"
          text="Sign Up"
          url="/subscription/"
          target=""
          modifier="nav-button__sign-up"
        />
        <Button
          text="Sign In"
          color="none"
          modifier="nav-button__sign-in"
          url="/signin/"
          target=""
        />
      </div>
    </div>
  );
};

export default NavButton;

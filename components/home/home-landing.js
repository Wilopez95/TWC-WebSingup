import React, { useEffect, useState } from 'react';
import getOnboarding from '../../hooks/components/get-onboarding';
import ChooseRightPlan from './choose-right-plan';
import Home from './home';
import HomeSection from './home-section';
const HomeLanding = () => {
  const [onboardingData, setOnboardingData] = useState('');
  const { data, isloading } = getOnboarding();
  useEffect(() => {
    if (data) {
      setOnboardingData(data);
    }
  }, [data]);
  if (isloading || !onboardingData) {
    return <></>;
  }

  return (
    <div>
      <section>
        <Home homeData={data.home} />
      </section>
      <section>
        <HomeSection
          data={data.stormCoverage}
          modifier={'home-landing__storm-coverage'}
          modifierImage={'home-landing__storm-coverage__image'}
          modifierPicture={'home-landing__storm-coverage__picture'}
          modifierContent={'home-landing__storm-coverage__content'}
          modifierTitleContainer={'home-landing__storm-coverage__container'}
          modifierTitle={'home-landing__storm-coverage__container__title'}
          modifierBody={'home-landing__storm-coverage__text'}
          OpacityBackground={'home-landing__background-opacity'}
        />
      </section>
      <section>
        <HomeSection
          data={data.streamDevices}
          modifier={'home-landing__stream-devices'}
          modifierImage={'home-landing__stream-devices__image'}
          modifierPicture={'home-landing__stream-devices__picture'}
          modifierContent={'home-landing__stream-devices__content'}
          modifierTitleContainer={'home-landing__stream-devices__container'}
          modifierTitle={'home-landing__stream-devices__container__title'}
          OpacityBackground={'home-landing__background-opacity'}
          streamDevice={true}
          devices={true}
        />
      </section>
      <section>{<ChooseRightPlan data={data.choosePlan} />}</section>

      <section>
        <HomeSection
          data={data.severeWeatherAlerts}
          modifier={'home-landing__severe-weather'}
          modifierImage={'home-landing__severe-weather__image'}
          modifierPicture={'home-landing__severe-weather__picture'}
          modifierContent={'home-landing__severe-weather__content'}
          modifierTitleContainer={'home-landing__severe-weather__container'}
          modifierTitle={'home-landing__severe-weather__container__title'}
          modifierBody={'home-landing__severe-weather__text'}
          OpacityBackground={'home-landing__background-opacity'}
        />
      </section>

      <section>
        <HomeSection
          data={data.currentConditions}
          modifier={'home-landing__severe-weather'}
          modifierImage={'home-landing__severe-weather__image'}
          modifierPicture={'home-landing__severe-weather__picture'}
          modifierContent={'home-landing__severe-weather__content'}
          modifierTitleContainer={'home-landing__severe-weather__container'}
          modifierTitle={'home-landing__severe-weather__container__title'}
          modifierBody={'home-landing__severe-weather__text'}
          OpacityBackground={'home-landing__background-opacity'}
        />
      </section>

      <section>
        <HomeSection
          data={data.activeMapsAndRadar}
          modifier={'home-landing__active-maps'}
          modifierImage={'home-landing__active-maps__image'}
          modifierPicture={'home-landing__active-maps__picture'}
          modifierContent={'home-landing__active-maps__content'}
          modifierTitleContainer={'home-landing__active-maps__container'}
          modifierTitle={'home-landing__active-maps__container__title'}
          modifierBody={'home-landing__active-maps__text'}
          OpacityBackground={'home-landing__background-opacity'}
          maps={true}
        />
      </section>

      <section>
        <HomeSection
          data={data.originalShows}
          modifier={'home-landing__original-show'}
          modifierImage={'home-landing__original-show__image'}
          modifierPicture={'home-landing__original-show__picture'}
          modifierContent={'home-landing__original-show__content'}
          modifierTitleContainer={'home-landing__original-show__container'}
          modifierTitle={'home-landing__original-show__container__title'}
          modifierBody={'home-landing__original-show__text'}
          OpacityBackground={'home-landing__background-opacity'}
        />
      </section>

      <section>
        <HomeSection
          data={data.breakingWeather}
          modifier={'home-landing__breaking-weather'}
          modifierImage={'home-landing__breaking-weather__image'}
          modifierPicture={'home-landing__breaking-weather__picture'}
          modifierContent={'home-landing__breaking-weather__content'}
          modifierTitleContainer={'home-landing__breaking-weather__container'}
          modifierTitle={'home-landing__breaking-weather__container__title'}
          modifierBody={'home-landing__breaking-weather__text'}
          OpacityBackground={'home-landing__background-opacity'}
        />
      </section>
    </div>
  );
};
export default HomeLanding;

import React from 'react';
import Button from '../button';
import landingInformation from '../../data/components/landing-home.json';
import Picture from '../picture';
import NavButton from './navButton';
import useWindowDimensions from '../../helpers/window.dimensions';

const Home = ({ homeData }) => {
  const data = homeData;
  const { isDesktop } = useWindowDimensions();

  const backgroundImage = {
    imgMobile: {
      src: isDesktop ? data.code_block.web : data.code_block.mobile,
      alt: 'alt'
    }
  };

  return (
    <div className="home">
      <NavButton />

      <Picture modifier={'home__image'} imageModifier={'home__picture'} images={backgroundImage} />
      <div className={'layout'}>
        <div className={'layout--left'}>
          <div className="home__title-container">
            <p className="home__title-container__title">{data.headline}</p>
          </div>
          <div className="home__body-container">
            <p className="home__body-container__text">{data.body}</p>
          </div>

          <div className="home__free-trial-container">
            <p className="home__free-trial-container__text">{data.ctas[0].headline}</p>

            <Button
              text={data.ctas[0].cta}
              color="red"
              modifier={'home__login-container__button-red'}
              url={landingInformation.freeTrial.href}
              target=""
            />
          </div>

          <div className="home__login-container">
            <p className="home__login-container__text">{data.ctas[1].headline}</p>
            <div className="home__login-container__button">
              <Button
                text={data.ctas[1].cta}
                color="none"
                modifier={'login-container__button'}
                url={landingInformation.login.href}
                target=""
              />
            </div>
            <p className="home__login-container__conditional-text">{data.ctas[1].body}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

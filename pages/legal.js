import { useEffect, useState } from 'react';
import Navbar from '../components/help-flow/navbar';
import WeatherImage from '../components/weather-image';
import Accordion from '../components/accordion';
import InformationBox from '../components/information-box';
import SelectorData from '../constants/selectors-data';
import { useRouter } from 'next/dist/client/router';

const Legal = () => {
  const route = useRouter();
  const [active, setActive] = useState('Visitor Agreement');
  const { legal } = SelectorData();
  const section = route.query.section;

  useEffect(() => {
    if (section === 'visitor-agreement') {
      setActive('Visitor Agreement');
    } else if (section === 'privacy-policy') {
      setActive('Privacy Policy');
    } else if (section === 'ccpa') {
      setActive('CCPA');
    } else if (section === 'do-not-sell-my-information') {
      setActive('Do Not Sell My Information');
    } else {
      setActive('Visitor Agreement');
    }
  }, [section]);

  const content = () => {
    for (const option in legal) {
      if (legal[option].value === active) {
        if (legal[option].value === 'FAQ') {
          return <Accordion />;
        } else {
          return <InformationBox queryKey={legal[option].value} isLegal={true} />;
        }
      }
    }
  };

  return (
    <div className="legal">
      <div className="legal__header-container">
        <WeatherImage />
        <h1 className="legal__header-container__title">Legal</h1>
      </div>
      <Navbar active={active} setActive={setActive} options={legal} modifier="legal__navbar" />
      {content()}
    </div>
  );
};

export default Legal;

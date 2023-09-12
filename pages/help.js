import { useState } from 'react';
import Navbar from '../components/help-flow/navbar';
import WeatherImage from '../components/weather-image';
import Accordion from '../components/accordion';
import InformationBox from '../components/information-box';
import SelectorData from '../constants/selectors-data';

const Help = () => {
  const [active, setActive] = useState('FAQ');
  const { help } = SelectorData();

  const content = () => {
    for (const option in help) {
      if (help[option].value === active) {
        if (help[option].value === 'FAQ') {
          return <Accordion />;
        } else {
          return <InformationBox queryKey={help[option].value} />;
        }
      }
    }
  };

  return (
    <div className="help">
      <div className="help__header-container">
        <WeatherImage />
        <h1 className="help__header-container--title">Help</h1>
      </div>
      <Navbar active={active} setActive={setActive} options={help} />
      {content()}
    </div>
  );
};

export default Help;

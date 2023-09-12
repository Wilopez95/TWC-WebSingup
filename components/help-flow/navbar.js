import { useEffect } from 'react';
import useWindowDimensions from '../../helpers/window.dimensions';
import Field from '../field';
import PropTypes from 'prop-types';

const Navbar = ({ active, setActive, options, modifier }) => {
  const { isMobile } = useWindowDimensions();

  Navbar.propTypes = {
    active: PropTypes.string,
    setActive: PropTypes.func,
    options: PropTypes.array,
    modifier: PropTypes.string
  };

  useEffect(() => {
    if (options.length) {
      setActive(options[0].value);
    }
  }, []);

  const onPressOption = (key) => {
    setActive(key);
  };

  const mobileBar = () => {
    return (
      <div className="select">
        <Field
          type="select"
          initialValue={active}
          options={options}
          getValue={(value) => onPressOption(value)}
        />
      </div>
    );
  };

  const desktopBar = () => {
    return (
      <>
        <nav className={`navbar ${modifier || ''}`}>
          {options.map((option) => {
            return (
              <button
                className={`navbar__button ${
                  active && option.value === active ? 'navbar--active' : ''
                }`}
                key={option.id}
                onClick={() => onPressOption(option.value)}
              >
                {option.value}
              </button>
            );
          })}
        </nav>
      </>
    );
  };

  return isMobile ? mobileBar() : desktopBar();
};

export default Navbar;

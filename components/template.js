import Footer from './footer';
import BackgroundImage from './background-image';

const Template = ({ children }) => {
  return (
    <>
      <div className="main-body" id="main-body">
        <BackgroundImage />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Template;

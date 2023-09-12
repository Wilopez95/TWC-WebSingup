import getConfiguration from '../hooks/components/get-configuration';
const Footer = () => {
  const { configurationData } = getConfiguration();
  const date = new Date();
  const year = date.getFullYear();
  const copyright = `© ${year} Weather Group Television, LLC`;
  return (
    <>
      <div className="footer">
        <div className="footer__content">
          <div className="footer__help">
            <a
              className="footer__link"
              href="/manage-account"
              aria-label="Clicking Account will take you to the account section."
            >
              Account
            </a>
            <a
              target="_blank"
              className="footer__link"
              href="/help"
              aria-label="Clicking Help will take you to the help section."
            >
              Help
            </a>
            <a
              target="_blank"
              className="footer__link"
              href="/legal"
              aria-label="Clicking Legal will take you to the legal section."
            >
              Legal
            </a>
            <a
              className="footer__link"
              href="/"
              aria-label="Clicking About will take you to the about section."
              rel="noreferrer"
            >
              About
            </a>
          </div>
          <div>
            <p className="footer__text">
              {configurationData ? configurationData.dsp.web.copyright : copyright}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;

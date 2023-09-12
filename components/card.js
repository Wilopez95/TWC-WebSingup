const Card = ({ children, modifier, ariaLabel, tabIndex }) => {
  return (
    <div className={`card ${modifier}`} aria-label={ariaLabel} tabIndex={tabIndex}>
      {children}
    </div>
  );
};

export default Card;

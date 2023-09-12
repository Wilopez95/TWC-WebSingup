const messages = {
  'Wrong email or verification code.':
    'We were not able to verify the passcode you entered. Please try again or enter a new code.',
  'There was an error processing your payment: CVV must be 4 digits for American Express and 3 digits for other card types.':
    'We could not authorize or verify your credit card. Please check again or provide a different credit card.',
  "The billing information you provided is not valid. Make sure it is valid, and that your 'Country' parameter is formatted to ISO 2 letter standard.":
    "We've encountered an error somewhere along the line. Please verify your information and try again.",
  fatal: 'Please go back and verify your information and try again.',
  'Expire token': 'Session expired please referesh the page',
  'Subscription Error': 'Subscription not found please check your email.',
  'Invalid token specified': 'There was an error validating your data',
  'This user does not have a subscription.': 'This user does not have a subscription.'
};

const MapError = (error) => {
  const message = messages[error];
  if (message) {
    return message;
  } else {
    return 'Please go back and verify your information and try again.';
  }
};

export default MapError;

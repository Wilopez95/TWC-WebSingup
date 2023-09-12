import jwt_decode from 'jwt-decode';

const parseAccessToken = (data) => {
  var parseData = jwt_decode(data);
  return parseData[process.env.AUTH_DSP_PARSER_STRING];
};

const parseExpirationDate = (accessToken) => {
  var parseData = jwt_decode(accessToken);
  return parseData.expires;
};

export { parseAccessToken, parseExpirationDate };

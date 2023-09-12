const authData = {
  grant_type: process.env.AUTH_GRANT_TYPE,
  client_id: process.env.AUTH_ZERO_CLIENT_ID,
  scope: 'openid profile',
  audience: 'https://api.myspotlight.tv/'
};

export { authData };

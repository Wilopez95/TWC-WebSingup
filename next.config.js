/* eslint-disable no-unused-vars */
module.exports = {
  env: {
    DOT_STUDIO_URL: process.env.DOT_STUDIO_URL,
    AUTH_ZERO_URL: process.env.AUTH_ZERO_URL,
    DSP_API_KEY: process.env.DSP_API_KEY,
    AUTH_ZERO_CLIENT_ID: process.env.AUTH_ZERO_CLIENT_ID,
    AUTH_DSP_PARSER_STRING: process.env.AUTH_DSP_PARSER_STRING,
    AUTH_GRANT_TYPE: process.env.AUTH_GRANT_TYPE
  },
  trailingSlash: true,
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      '/subscription': { page: '/signup' },
      '/signin': { page: '/signin' },
      '/manage-account': { page: '/manage-account' },
      '/help': { page: '/help' },
      '/legal': { page: '/legal' },
      '/404': { page: '/404' }
    };
  }
};

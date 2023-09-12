import React, { useState, useEffect, createContext } from 'react';
import { urls, apiKeys } from '../constants/api-routes';
import { useFetchPostDataV2 } from '../hooks/use-fetch';
import tokenMapping from '../data/mappings/token-mapping';
import siteRoutes from '../constants/routes';
import ScreenLoading from '../components/screen-loading';

const TokenContext = createContext();

const TokenProvider = (props) => {
  const router = props.router;
  const key = apiKeys.TOKEN;
  const url = process.env.DOT_STUDIO_URL + urls.TOKEN;
  const tokenKey = process.env.DSP_API_KEY;
  const routesWithToken = [
    siteRoutes.SUBSCRIPTION_ACTIVATE_PAGE,
    siteRoutes.SUBSCRIPTION_PAGE,
    siteRoutes.ACTIVATE_PAGE,
    siteRoutes.MANAGE_ACCOUNT_PAGE,
    siteRoutes.COMPONENTS_PAGE,
    siteRoutes.HOME_PAGE,
    siteRoutes.HELP_PAGE,
    siteRoutes.LEGAL_PAGE,
    siteRoutes.LOGIN_PAGE
  ];
  const [tokenData, setTokenData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isTokenNeeded = routesWithToken.find((route) => route === router.pathname) ? true : false;
  const isBrowser = () => typeof window !== 'undefined';

  const { data, isLoadingToken, error } = useFetchPostDataV2(
    key,
    url,
    { key: tokenKey },
    isTokenNeeded
  );

  useEffect(() => {
    if (router.isReady && isBrowser()) {
      if (!isTokenNeeded) {
        return <TokenContext.Provider value={{}} {...props} />;
      }
    }
  }, [router.isReady, router.pathname]);

  useEffect(() => {
    if (data) {
      setTokenData(tokenMapping(data));
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if ((isLoading || isLoadingToken) && isTokenNeeded) {
    return <ScreenLoading />;
  }

  if (error) {
    console.log(error);
  }

  return <TokenContext.Provider value={tokenData} {...props} />;
};

export { TokenProvider, TokenContext };

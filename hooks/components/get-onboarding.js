import { urls, apiKeys } from '../../constants/api-routes';
import onboardMapping from '../../data/mappings/onboard-mapping';
import useToken from '../use-token';
import { useFetchGetData } from '../use-fetch';
import { useEffect, useState } from 'react';

const getOnboarding = () => {
  const token = useToken();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const url = process.env.DOT_STUDIO_URL + urls.ONBOARDING;

  const { data, error } = useFetchGetData(apiKeys.ONBOARDING, url, { 'x-access-token': token });

  useEffect(() => {
    if (data) {
      setComponentData(onboardMapping(data));
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoadingComp(false);
    }
  }, [error]);

  return { data: componentData, isloading: isLoadingComp, error };
};

export default getOnboarding;

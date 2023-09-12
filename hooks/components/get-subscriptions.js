import { urls, apiKeys } from '../../constants/api-routes';
import useToken from '../use-token';
import { useFetchGetData } from '../use-fetch';
import { useEffect, useState } from 'react';
import subscriptionsMapping from '../../data/mappings/subscriptions-mapping';

const getSubscriptions = () => {
  const token = useToken();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);
  const url = process.env.DOT_STUDIO_URL + urls.SUBSCRIPTIONS_SUMMARY;

  const { data, error } = useFetchGetData(apiKeys.SUBSCRIPTIONS_SUMMARY, url, {
    'x-access-token': token
  });

  useEffect(() => {
    if (data) {
      setComponentData(subscriptionsMapping(data));
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoadingComp(false);
    }
  }, [error]);

  return { data: componentData, isLoading: isLoadingComp, error };
};

export default getSubscriptions;

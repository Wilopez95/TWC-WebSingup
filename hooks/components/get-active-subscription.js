import { urls, apiKeys } from '../../constants/api-routes';
import useToken from '../use-token';
import { useFetchGetData } from '../use-fetch';
import { useEffect, useState } from 'react';
import useUser from '../use-user';
import activeSubscriptionMapping from '../../data/mappings/active-subscription-mapping';

const getActiveSubscription = () => {
  const token = useToken();
  const { user } = useUser();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const url = process.env.DOT_STUDIO_URL + urls.ACTIVE_SUBSCRIPTION;
  const auth = {
    'x-client-token': user.accessToken,
    'x-access-token': token
  };

  const { data, error } = useFetchGetData(apiKeys.ACTIVE_SUBSCRIPTION, url, auth);

  useEffect(() => {
    if (data) {
      setComponentData(activeSubscriptionMapping(data));
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

export default getActiveSubscription;

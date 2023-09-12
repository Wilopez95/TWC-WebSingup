import { urls, apiKeys } from '../../constants/api-routes';
import useToken from '../use-token';
import { useFetchGetData } from '../use-fetch';
import { useEffect, useState } from 'react';
import useUser from '../use-user';
import historySubscriptionMapping from '../../data/mappings/history-subscription-mapping';

const getHistorySubscription = () => {
  const token = useToken();
  const { user } = useUser();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const url = process.env.DOT_STUDIO_URL + urls.HISTORY_SUBSCRIPTION;
  const auth = {
    'x-client-token': user.accessToken,
    'x-access-token': token
  };

  const { data, error } = useFetchGetData(apiKeys.HISTORY_SUBSCRIPTION, url, auth);

  useEffect(() => {
    if (data) {
      setComponentData(historySubscriptionMapping(data));
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoadingComp(false);
    }
  }, [error]);

  return { history: componentData, isLoading: isLoadingComp, error };
};

export default getHistorySubscription;

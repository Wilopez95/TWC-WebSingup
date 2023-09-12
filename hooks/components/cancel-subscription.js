import { urls } from '../../constants/api-routes';
import { usePostFormV2 } from '../use-fetch';
import { useEffect, useState } from 'react';
import useUser from '../use-user';
import useToken from '../use-token';

const cancelSubscription = (onSuccess, onError) => {
  const { user } = useUser();
  const token = useToken();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const auth = {
    'x-client-token': user.accessToken,
    'x-access-token': token
  };
  const url = process.env.DOT_STUDIO_URL + urls.CANCEL_SUBSCRIPTION;

  const { data, error, mutate } = usePostFormV2(url, auth, onSuccess, onError);

  useEffect(() => {
    if (data) {
      setComponentData(componentData);
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoadingComp(false);
    }
  }, [error]);

  const cancel = () => {
    mutate();
  };

  return { data: componentData, isloading: isLoadingComp, error, cancel };
};

export default cancelSubscription;

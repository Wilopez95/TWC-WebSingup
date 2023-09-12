import { urls } from '../../constants/api-routes';
import useToken from '../use-token';
import useUser from '../use-user';
import { useEffect, useState } from 'react';
import { usePostFormV2 } from '../use-fetch';

const postSubscriptionTo = (onSuccess, onError) => {
  const token = useToken();
  const { user } = useUser();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);
  const [id, setId] = useState('');

  const auth = {
    'x-access-token': token,
    'x-client-token': user.accessToken
  };
  const url = process.env.DOT_STUDIO_URL + urls.SUBSCRIPTION_TO + id + '?platform=web';
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

  async function postDataTo(subcriptionId) {
    await setId(subcriptionId);
    mutate();
  }

  return { data: componentData, isloading: isLoadingComp, error, postDataTo };
};

export default postSubscriptionTo;

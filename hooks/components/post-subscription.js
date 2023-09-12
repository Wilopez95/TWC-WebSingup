import { urls } from '../../constants/api-routes';
import useToken from '../use-token';
import { useEffect, useState } from 'react';
import { usePostFormV2 } from '../use-fetch';

const postSubscription = (onSuccess, onError) => {
  const token = useToken();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const auth = {
    'x-access-token': token
  };
  const url = process.env.DOT_STUDIO_URL + urls.SUBSCRIPTION;
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

  const postData = (body) => {
    mutate(body);
  };

  return { data: componentData, isloading: isLoadingComp, error, postData };
};

export default postSubscription;

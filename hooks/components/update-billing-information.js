import { urls } from '../../constants/api-routes';
import useToken from '../use-token';
import { useFetchLazyPut } from '../use-fetch';
import { useEffect, useState } from 'react';
import useUser from '../use-user';

const updateBillingInformation = (onSuccess, onError) => {
  const token = useToken();
  const { user } = useUser();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const url = process.env.DOT_STUDIO_URL + urls.UPDATE_SUBSCRIPTION;
  const auth = {
    'x-client-token': user.accessToken,
    'x-access-token': token
  };

  const { data, error, mutate } = useFetchLazyPut(url, auth, onSuccess, onError);

  useEffect(() => {
    if (data) {
      setComponentData(data);
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoadingComp(false);
    }
  }, [error]);

  const update = (passcode) => {
    mutate({
      ...passcode
    });
  };

  return { data: componentData, isloading: isLoadingComp, error, update };
};

export default updateBillingInformation;

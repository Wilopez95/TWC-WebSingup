import { urls } from '../../constants/api-routes';
import useToken from '../use-token';
import { useLazyGet } from '../use-fetch';
import { useEffect, useState } from 'react';
import useUser from '../use-user';

const getProducts = (onSuccess, onError) => {
  const token = useToken();
  const { user } = useUser();

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const url = process.env.DOT_STUDIO_URL + urls.PRODUCTS + '?include_inactive_products=true';
  const auth = {
    'x-client-token': user.accessToken,
    'x-access-token': token
  };

  const { data, error, mutate } = useLazyGet(url, auth, onSuccess, onError);

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

  const getMembershipStatus = () => {
    mutate();
  };

  return { data: componentData, isLoading: isLoadingComp, error, getMembershipStatus };
};

export default getProducts;

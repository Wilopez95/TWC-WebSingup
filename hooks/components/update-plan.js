import { urls } from '../../constants/api-routes';
import { usePostFormV2 } from '../use-fetch';
import { useEffect, useState } from 'react';
import useUser from '../use-user';
import useToken from '../use-token';

const updatePlan = (id, onSuccess) => {
  const { user } = useUser();
  const token = useToken();
  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);

  const url = process.env.DOT_STUDIO_URL + urls.CHANGE_PLAN;
  const auth = {
    'x-client-token': user.accessToken,
    'x-access-token': token
  };
  const params = '?platform=web';
  const { data, error, mutate } = usePostFormV2(url + `${id}` + params, auth, onSuccess);

  useEffect(() => {
    if (data) {
      setComponentData(data);
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log('error', error);
      setIsLoadingComp(false);
    }
  }, [error]);

  const update = () => {
    mutate();
  };

  return { data: componentData, isloading: isLoadingComp, error, update };
};

export default updatePlan;

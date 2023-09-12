import { urls } from '../../constants/api-routes';
import { authData } from '../../config/authData';
import { useUpdatePost } from '../use-fetch';

const getPasscode = (onSuccess, onError) => {
  const url = process.env.AUTH_ZERO_URL + urls.PASSCODE;
  const { error, data, isLoading, mutate } = useUpdatePost(url, onSuccess, onError);

  const sendEmail = (email) => {
    mutate({
      client_id: authData.client_id,
      connection: 'email',
      email: email,
      send: 'code',
      authParams: {
        scope: authData.scope
      }
    });
  };

  return { data, isLoading, error, sendEmail };
};

export default getPasscode;

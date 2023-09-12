import { urls } from '../../constants/api-routes';
import { useUpdatePost } from '../use-fetch';
import { parseAccessToken, parseExpirationDate } from '../../helpers/jwt-decode';
import { authData } from '../../config/authData';
import useUser from '../use-user';

const getAccessToken = (onSuccess, onError) => {
  const url = process.env.AUTH_ZERO_URL + urls.LOGIN;
  const { user } = useUser();
  const { setAccessToken } = useUser();

  const logUser = (data) => {
    var accessToken = parseAccessToken(data.access_token);
    var expires = parseExpirationDate(accessToken);
    setAccessToken(accessToken, expires);
  };

  const { error, data, isLoading, mutate } = useUpdatePost(
    url,
    (data) => {
      if (data.status === 200) {
        logUser(data);
        onSuccess(data);
      } else {
        onError(data);
      }
    },
    onError
  );

  const sendPasscode = (passcode) => {
    mutate({
      grant_type: authData.grant_type,
      client_id: authData.client_id,
      otp: passcode,
      realm: 'email',
      username: user.email,
      scope: authData.scope,
      audience: authData.audience
    });
  };

  return { data, isLoading, error, sendPasscode };
};

export default getAccessToken;

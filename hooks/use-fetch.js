import { useQuery, useMutation } from 'react-query';

const useFetchGetData = (queryKey, queryPath, auth) => {
  const queryURL = queryPath;
  return useQuery(queryKey, async () => {
    const response = await fetch(queryURL, {
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json',
        ...auth
      }
    });
    return response.json();
  });
};

const useFetchGetDataV2 = (queryKey, url, params) => {
  const queryURL = url + params;
  return useQuery(queryKey, async () => {
    const response = await fetch(queryURL, {
      headers: {
        Accept: 'application/json'
      }
    });
    const content = await response.json();
    return content;
  });
};

const useFetchPostDataV2 = (queryKey, url, body, enabled = true) => {
  const queryURL = url;
  return useQuery(
    queryKey,
    async () => {
      var requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
        redirect: 'follow'
      };
      const response = await fetch(queryURL, requestOptions);
      const content = await response.json();
      content.status = response.status;
      return content;
    },
    { enabled }
  );
};

const useUpdatePost = (
  url,
  onSuccess = () => {},
  onError = (error) => {
    console.log(error);
  }
) => {
  return useMutation(
    async (body) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };
      const response = await fetch(url, requestOptions);
      const content = await response.json();
      content.status = response.status;
      return content;
    },
    {
      onError: onError,
      onSuccess: onSuccess
    }
  );
};

const usePostFormV2 = (
  url,
  auth,
  onSuccess = () => {},
  onError = (error) => {
    console.log(error);
  }
) => {
  return useMutation(
    async (body) => {
      const requestOptions = {
        method: 'POST',
        body: body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...auth
        }
      };
      const content = await fetch(url, requestOptions);
      const response = await content.json();
      response.status = content.status;
      return response;
    },
    {
      onError: onError,
      onSuccess: onSuccess
    }
  );
};

const useFetchLazyPut = (
  url,
  auth,
  onSuccess = () => {},
  onError = (error) => {
    console.log(error);
  }
) => {
  return useMutation(
    async (body) => {
      const requestOptions = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...auth
        }
      };
      const content = await fetch(url, requestOptions);
      const response = await content.json();
      response.status = content.status;
      return response;
    },
    {
      onError: onError,
      onSuccess: onSuccess
    }
  );
};

const useLazyGet = (
  url,
  auth,
  onSuccess = () => {},
  onError = (error) => {
    console.log(error);
  }
) => {
  return useMutation(
    async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          ...auth
        }
      };
      const response = await fetch(url, requestOptions);
      const content = await response.json();
      content.status = response.status;
      return content;
    },
    {
      onError: onError,
      onSuccess: onSuccess
    }
  );
};

export {
  useFetchGetData,
  useFetchGetDataV2,
  useFetchPostDataV2,
  useUpdatePost,
  usePostFormV2,
  useFetchLazyPut,
  useLazyGet
};

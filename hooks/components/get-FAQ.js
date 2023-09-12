import { urls, apiKeys } from '../../constants/api-routes';
import useToken from '../use-token';
import { useFetchGetData } from '../use-fetch';
import { useEffect, useState } from 'react';
import faqMapping from '../../data/mappings/faq-mapping';
import { useRouter } from 'next/dist/client/router';

const getFAQ = () => {
  const token = useToken();
  const route = useRouter();
  const isMockup = route.query.mockup === 'true' ? route.query.mockup : false;

  const [componentData, setComponentData] = useState();
  const [isLoadingComp, setIsLoadingComp] = useState(true);
  const url = process.env.DOT_STUDIO_URL + urls.FAQ;

  const { data, error } = useFetchGetData(apiKeys.FAQ, url, { 'x-access-token': token });

  useEffect(() => {
    if (data) {
      setComponentData(faqMapping(data, isMockup));
      setIsLoadingComp(false);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setIsLoadingComp(false);
    }
  }, [error]);

  return { data: componentData, isloading: isLoadingComp, error };
};

export default getFAQ;
